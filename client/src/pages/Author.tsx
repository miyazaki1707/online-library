import React, { useEffect, useState } from 'react'
import { Menu, X } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


interface Author {
    id: number,
    photo: string,
    fio: string,
    age: number
}

interface AuthorPostData {
    fio: string,
    photo: string,
    age: number
}

const Author = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [authorData, setAuthorData] = useState<AuthorPostData>({ fio: '', age: 0, photo: '' });

    async function parseAuthors() {
        const response = await fetch('http://localhost:3000/authors', {
            mode: 'cors'
        });
        let data = await response.json();
        let authorsParsed: Author[] = [];
        data.forEach((e: any) => {
            authorsParsed.push(e);
            console.log(e);

        });

        setAuthors(authorsParsed);
    }

    const handleAuthorFio = (fio: string) => {
        setAuthorData((prev: any) => ({ ...prev, fio: fio }))
    }

    const handleAuthorAge = (age: number) => {
        setAuthorData((prev: any) => ({ ...prev, age: age }))
    }

    async function deleteAuthor(authorId: number) {
        const response = await fetch('http://localhost:3000/authors/' + authorId, {
            mode: 'cors',
            method: 'DELETE',
        })
        console.log(response);
    }

    useEffect(() => {
        parseAuthors();
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                            <Menu className="h-6 w-6 md:hidden" />
                        </div>
                        <nav className="hidden md:flex space-x-4">
                            <Link to={'/'}><Button variant="ghost">Книги</Button></Link>
                            <Link to={'/authors'}><Button variant="ghost">Авторы</Button></Link>
                            <Link to={'/publishers'}><Button variant="ghost">Издательства</Button></Link>
                            <Link to={'/users'}><Button variant="ghost">Пользователи</Button></Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default">Добавить автора</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Добавление автора</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fio">ФИО</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={authorData?.fio}
                                            onChange={(e) => { handleAuthorFio(e.target.value) }}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Возраст</Label>
                                        <Input
                                            id="author"
                                            type='number'
                                            name="author"
                                            value={authorData?.age}
                                            onChange={(e) => { handleAuthorAge(Number(e.target.value)) }}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="photo">Фото</Label>
                                        <Input
                                            required
                                            type="file"
                                            name="photo"
                                            onChange={(event: any) => {
                                                setAuthorData((prev: any) => ({ ...prev, photo: event.target.files[0] }))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="default" onClick={async () => {
                                        console.log(authorData);
                                        const formData = new FormData();
                                        formData.append('image', authorData.photo);
                                        formData.append("fio", authorData.fio);
                                        formData.append("age", String(authorData.age));
                                        //formData.append('fio', authorData.fio);
                                        //  formData.append('age', String(authorData.age));

                                        const response = await fetch('http://localhost:3000/authors', {
                                            mode: 'cors',
                                            method: 'POST',
                                            body: formData
                                        });
                                        const jsonData = await response.json();
                                        console.log(jsonData);


                                    }}>
                                        Сохранить
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {authors.map((author) => (
                        <Dialog key={author.id}>
                            <DialogTrigger asChild>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
                                    <img src={`http://localhost:3000${author.photo}`} alt={author.fio} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 mb-1 truncate">{author.fio}</h3>
                                        <p className="text-sm text-gray-600 truncate">Возраст: {author.age}</p>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{author.fio}</DialogTitle>
                                    <DialogDescription>Возраст: {author.age}</DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <img src={`http://localhost:3000${author.photo}`} alt={author.fio} className="w-full h-48 md:w-1/3 object-cover rounded-lg" />
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button onClick={(e: any) => { deleteAuthor(author.id) }}>Delete</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Author