-- =====================================================================
-- FINANZAS PERSONALES — Esquema completo (Supabase SQL Editor)
-- Padres: auth.users -> profiles, categories
-- Hija:   movements (user_id -> profiles, category_id -> categories)
-- Re-ejecutable. OJO: elimina la tabla anterior public.expenses.
-- =====================================================================

drop table if exists public.expenses;

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  created_at  timestamptz not null default now()
);

-- Catálogo global (sin user_id)
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  type        text not null check (type in ('income','expense')),
  created_at  timestamptz not null default now()
);

create table if not exists public.movements (
  id           bigint generated always as identity primary key,
  user_id      uuid not null default auth.uid()
                 references public.profiles (id) on delete cascade,
  category_id  uuid not null
                 references public.categories (id) on delete restrict,
  type         text not null check (type in ('income','expense')),
  amount       numeric(12,2) not null check (amount > 0),
  description  text check (description is null or char_length(description) <= 255),
  date         date not null default current_date,
  created_at   timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''),
             split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id, email, full_name)
select u.id, u.email,
       coalesce(nullif(u.raw_user_meta_data ->> 'full_name', ''),
                split_part(u.email, '@', 1))
from auth.users u
on conflict (id) do nothing;

-- RLS
alter table public.profiles   enable row level security;
alter table public.categories enable row level security;
alter table public.movements  enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "categories_select_all" on public.categories;
create policy "categories_select_all" on public.categories
  for select to authenticated
  using (true);

drop policy if exists "movements_select_own" on public.movements;
create policy "movements_select_own" on public.movements
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "movements_insert_own" on public.movements;
create policy "movements_insert_own" on public.movements
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "movements_update_own" on public.movements;
create policy "movements_update_own" on public.movements
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "movements_delete_own" on public.movements;
create policy "movements_delete_own" on public.movements
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Índices
create index if not exists movements_user_date_idx on public.movements (user_id, date desc);
create index if not exists movements_user_category_idx on public.movements (user_id, category_id);
create index if not exists movements_category_idx on public.movements (category_id);

-- Categorías iniciales
insert into public.categories (name, type) values
  ('Comida','expense'),('Transporte','expense'),('Entretenimiento','expense'),
  ('Servicios','expense'),('Salud','expense'),('Educación','expense'),
  ('Ropa','expense'),('Despensa','expense'),('Otros gastos','expense'),
  ('Salario','income'),('Ventas','income'),('Otros ingresos','income')
on conflict (name) do nothing;

-- Si tu usuario de prueba no puede entrar por falta de confirmación de correo:
-- update auth.users set email_confirmed_at = now() where email_confirmed_at is null;

notify pgrst, 'reload schema';
