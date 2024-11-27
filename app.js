const prompt = require('prompt-sync')()
require('dotenv').config()
const mongoose = require('mongoose')
const Customer = require('./models/customer')
console.log('Welcome to the CRM')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('What would you like to do?')
  console.log('1. Create a customer')
  console.log('2. View all customers')
  console.log('3. Update a customer')
  console.log('4. Delete a customer')
  console.log('5. quit')

  let num = await prompt('Number of action to run: ')

  if (num === '1') {
    const name = prompt('Enter customer name: ')
    const age = prompt('Enter customer age: ')
    await createCustomer(name, age)
  } else if (num === '2') {
    await findCustomer()
  } else if (num === '3') {
    await findCustomers()
    const id = prompt('Enter customer id to update: ')
    const name = prompt('Enter new customer name: ')
    const age = prompt('Enter new customer age: ')

    await updateCustomer(id, name, age)
  } else if (num === '4') {
    await findCustomers()
    const id = prompt('Enter customer id to delete: ')
    await deleteCustomer(id)
  } else if (num === '5') {
    console.log('exiting...')
    process.exit()
  }
  process.exit()
}
connect()
const createCustomer = async (name, age) => {
  const customerData = {
    name: name,
    age: age
  }

  const customer = await Customer.create(customerData)
  console.log('new customer', customer)
}

const updateCustomer = async (id, name, age) => {
  const idN = id
  const updatedCustomer = await Customer.findByIdAndUpdate(
    idN,
    { name: name },
    { age: age }
  )
  console.log('Updated customer:', updatedCustomer)
}

const findCustomer = async () => {
  const customers = await Customer.find()
  console.log('All Customers: ', customers)
}



const deleteCustomer = async (id) => {
  const idN = id
  const removedCustomer = await Customer.findByIdAndDelete(idN)
  console.log('Removed Customer:', removedCustomer)
}

const findCustomers = async () => {
  const customers = await Customer.find()
  console.log('Below is a list of customers: ')
  customers.forEach((elm) => {
    console.log(`id: ${elm.id} --  Name: ${elm.name}, Age: ${elm.age}`)
  })
}