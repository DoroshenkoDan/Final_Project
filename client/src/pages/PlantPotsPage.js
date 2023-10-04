import React from 'react'
import {useParams} from "react-router-dom";

export default function PlantPotsPage() {
  const {categoryId} = useParams()
  return <>
    {categoryId}
  </>
}
