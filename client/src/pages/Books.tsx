import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"
import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


interface Book {
    id: number,
    category: string,
    title: string,
    cover: string,
    desc: string,
    yearOfPub: number,
    isbn: string,
    language: string,
    pageCount: number,
    authorId: number,
    publisherId: number
}

interface Author {
    id: number,
    photo: string,
    fio: string,
    age: number
}

interface Publisher {
    id: number,
    name: string
}

const Books = () => {
    const [parsedBooks, setParsedBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [bookData, setBookData] = useState<Book>({
        id: 0,
        category: '',
        title: '',
        cover: '',
        desc: '',
        yearOfPub: 0,
        isbn: '',
        language: '',
        pageCount: 0,
        authorId: 0,
        publisherId: 0
    })


    async function parseBooks() {
        const response = await fetch('http://localhost:3000/books', {
            mode: 'cors'
        });
        let body = await response.json();
        let books: Book[] = [];
        body.forEach((e: any) => {
            books.push(e);
        });
        setParsedBooks(books);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBookData(prev => ({ ...prev, [name]: value }))
    }

    const handleAuthorChange = (value: string) => {
        setBookData(prev => ({ ...prev, authorId: Number(value) }))
    }

    const handlePublisherChange = (value: string) => {
        setBookData(prev => ({ ...prev, publisherId: Number(value) }))
    }

    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await fetch(`http://localhost:3000/authors`, {
                mode: 'cors'
            });

            let body = await response.json();
            setAuthors(body);
        }
        const fetchPublishers = async () => {
            const response = await fetch(`http://localhost:3000/publisher`, {
                mode: 'cors'
            })

            let body = await response.json();
            setPublishers(body);
        }

        fetchAuthors();
        fetchPublishers();
        parseBooks();
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
                            <Button variant="default">Добавить книгу</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Добавление книги</DialogTitle>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={bookData.title}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="author">Author</Label>
                                        <Select onValueChange={handleAuthorChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Выбрать автора" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {authors.map((item: Author) => (
                                                    <SelectItem key={item.id} value={String(item.id)}>
                                                        {item.fio}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="yearOfPub">Publication Year</Label>
                                        <Input
                                            id="yearOfPub"
                                            name="yearOfPub"
                                            type="number"
                                            value={bookData.yearOfPub}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="isbn">ISBN</Label>
                                        <Input
                                            id="isbn"
                                            name="isbn"
                                            value={bookData.isbn}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Genre</Label>
                                        <Input
                                            id="category"
                                            name="category"
                                            value={bookData.category}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pageCount">Page Count</Label>
                                        <Input
                                            id="pageCount"
                                            name="pageCount"
                                            type="number"
                                            value={bookData.pageCount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <Input
                                            id="language"
                                            name="language"
                                            value={bookData.language}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="publisher">Publisher</Label>
                                        <Select onValueChange={handlePublisherChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Выбрать издателя" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {publishers.map((item: Publisher) => (
                                                    <SelectItem key={item.id} value={String(item.id)}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="desc">Description</Label>
                                        <Textarea
                                            id="desc"
                                            name="desc"
                                            value={bookData.desc}
                                            onChange={handleInputChange}
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cover">Обложка</Label>
                                        <Input
                                            required
                                            type="file"
                                            name="cover"
                                            onChange={(event: any) => {
                                                setBookData((prev: any) => ({ ...prev, cover: event.target.files[0] }))
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <div className="flex justify-end space-x-2">
                                            <Button type="button" variant="default" onClick={async () => {
                                                const formData = new FormData();
                                                formData.append('image', bookData.cover);
                                                formData.append('title', bookData.title);
                                                formData.append('category', bookData.category);
                                                formData.append('desc', bookData.desc);
                                                formData.append('yearOfPub', String(bookData.yearOfPub));
                                                formData.append('isbn', bookData.isbn);
                                                formData.append('language', bookData.language);
                                                formData.append('pageCount', String(bookData.pageCount));
                                                formData.append('authorId', String(bookData.authorId));
                                                formData.append('publisherId', String(bookData.publisherId));

                                                const response = await fetch('http://localhost:3000/books', {
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
                                    </div>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {parsedBooks.map((book) => (
                        <React.Fragment key={book.id}>
                            <Link to={`/book/${book.id}`} state={{ book }}>
                                <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
                                    <img src={`http://localhost:3000${book.cover}`} alt={book.title} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 mb-1 truncate">{book.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Books