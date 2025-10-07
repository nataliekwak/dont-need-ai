import React from 'react'
import { Card, CardHeader, CardBody, Divider } from '@heroui/react';

import NavBar from '../components/Navbar.jsx';

// Displays the list of all the user's assignments and
// gives the user the ability to create a new assignment

const WritingGuide = () => {
  return (
    <div className="min-h-screen flex overflow-hidden flex-col">
      <NavBar />
      <div className="w-full relative flex flex-col min-h-screen items-center justify-center">
        <Card>
            <CardHeader>
              <h1>Assignments</h1>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>List of all assignments</p>
            </CardBody>
        </Card>  
      </div>
    </div>
  )
}

export default WritingGuide;
