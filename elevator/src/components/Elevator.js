import React from 'react';
import { useState, useEffect } from 'react'
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'


const Elevator = () => {
  const allFloors = ['1','2','3','4','5','6','7','8'];

  const [currentFloor, setCurrentFloor] = useState('1');
  const [previousFloor, setPreviousFloor] = useState('1');
  const [isMoving, setIsMoving] = useState(false);
  const [seeFloor, setSeeFloor] = useState(1)
  const [projectedFloor, setProjectedFloor] = useState(1)
  
  //Using asnyc, await to simulated waiting while elevator moves
  const goToSleep = (time) => new Promise((resolve => setTimeout(resolve, time)))

  //Used to calculate how many seconds the elevator will be in motion
  const getWaitTime = (floor) => {
    if (floor > parseInt(previousFloor)){
      const waitTime = floor - parseInt(previousFloor)
      console.log('wait time', waitTime)
      return waitTime
    }
    else {
      const waitTime = parseInt(previousFloor) - floor
      console.log('wait time', waitTime)
      return waitTime
    }
  }
  
  //Used to display current floor as elevator moves
  const seeTheFloors = () => {
    if (seeFloor < projectedFloor){
      for (let i = seeFloor; i < projectedFloor; i++){
        setTimeout(() => setSeeFloor(seeFloor+1), 1000)
      }
    }
    else {
      for (let i = seeFloor; i > projectedFloor; i--){
        setTimeout(() => setSeeFloor(seeFloor-1), 1000)
      }
    }
  }

  //Sets projected floor for current floor display and also sets sleep for floor arrival 
  const handleClick = async (event) => {
    setProjectedFloor(parseInt(event.target.value))
    setIsMoving(true)
    await goToSleep(getWaitTime(parseInt(event.target.value)) * 1000)
    await setCurrentFloor(event.target.value)
    setIsMoving(false)
  }

  useEffect(() => {
    seeTheFloors()
    setPreviousFloor(currentFloor)
  })
  
  //Made user unable to select another floor while elevator is moving, did not add multiple selection due to time constraint
  //Added conditional rendering for selecting floor and elevator moving, conditional rendering based on floor arrival
  return (
    <div>
      <h1>Main Elevator</h1>
      <h1>{seeFloor}</h1>
      <br/>
      { 
        !isMoving ?
        <p>Select a floor when ready</p>
        :
        <p>Elevator is moving</p>
      }
      <div>
        <ButtonToolbar>
          <ButtonGroup className='mr-2' disabled='true'>
            {
              !isMoving ? 
              allFloors.map((floor, index) => <Button onClick={handleClick} value={floor}>{floor}</Button>)
              : 
              allFloors.map((floor, index) => <Button value={floor}>{floor}</Button>) 
            }
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <br/>
      {currentFloor == 1 ? <h4>*You are currently on the ground floor* </h4>: <h4>*You are now on floor {currentFloor}*</h4>}
    </div>
  );
};

export default Elevator;