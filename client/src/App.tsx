import { Route, Routes } from "react-router-dom"
import Books from "./pages/Books"
import Author from "./pages/Author"
import Book from "./pages/Book"
import { Publishers } from "./pages/Publishers"
import { Users } from "./pages/Users"

export default function OnlineLibrary() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Books></Books>}></Route>
      <Route
        path='/authors'
        element={<Author></Author>}></Route>
      <Route path='/book/:habbitId' element={<Book />}>
      </Route>
      <Route
        path='/publishers'
        element={<Publishers></Publishers>}></Route>
      <Route
        path='/users'
        element={<Users></Users>}></Route>
    </Routes >)
}