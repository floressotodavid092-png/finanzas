import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const TransactionForm = () => {
const [category,setCategory]=useState('')
const [amount,setamount]=useState('')
const [description,setdescription]=useState('')
  return (
    <View>
      <TextInput
      placeholder='Enter the amount $'
      value={amount}
      onChangeText={setamount}
      />
    </View>
  )
}

export default TransactionForm

const styles = StyleSheet.create({})