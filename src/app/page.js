import React from 'react'
import Frontid from './components/idfront/idfront'
import BackId from './components/idback/idback'
import Addid from './components/crud/addid'
import ViewIdDetails from './components/crud/viewid'
export default function page() {
  return (
    <>
  {/* <Frontid/> */}
  {/* <BackId/> */}
  <Addid/>
  <ViewIdDetails/>
  </>
  )
}
