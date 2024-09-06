import React from 'react'
import Frontid from './components/idfront/idfront'
import BackId from './components/idback/idback'
import ViewId from './components/crud/viewid'
import ViewIdDetails from './components/crud/viewiddetails'
import Add from './components/crud/add'
export default function page() {
  return (
    <>
 <Add/>
  <ViewId/>
  <ViewIdDetails/>
  </>
  )
}
