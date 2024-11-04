'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, Edit, X, Send } from "lucide-react"
import { useLocation } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface BookData {
    id: string
    title: string
    author: string
    publicationYear: number
    isbn: string
    description: string
    coverImage: string
    genre: string
    pageCount: number
    language: string
    publisher: string
}

interface Comment {
    id: string
    userId: string
    bookId: string
    content: string
}

const initialBookData: BookData = {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publicationYear: 1960,
    isbn: '978-0446310789',
    description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.',
    coverImage: '/placeholder.svg?height=400&width=300',
    genre: 'Southern Gothic, Bildungsroman',
    pageCount: 281,
    language: 'English',
    publisher: '',
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

interface User {
    id: number,
    username: string
}

export default function BookPage() {
    const [bookData, setBookData] = useState<BookData>(initialBookData)
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false)
    const [selectedUser, setSelectedUser] = useState<string>();

    const location = useLocation();
    const { book } = location.state || {};

    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await fetch(`http://localhost:3000/authors/${book.authorId}`, {
                mode: 'cors'
            });
            let body = await response.json();
            setBookData(prev => ({ ...prev, author: body.fio }))
        }

        const fetchAuthors = async () => {
            const response = await fetch(`http://localhost:3000/authors`, {
                mode: 'cors'
            });
            let body = await response.json();
            setAuthors(body);
        }

        const fetchPublisher = async () => {
            const response = await fetch(`http://localhost:3000/publisher/${book.publisherId}`, {
                mode: 'cors'
            })
            let body = await response.json();
            setBookData(prev => ({ ...prev, publisher: body.name }))
        }

        const fetchPublishers = async () => {
            const response = await fetch(`http://localhost:3000/publisher`, {
                mode: 'cors'
            })

            let body = await response.json();
            setPublishers(body);
        }

        const fetchUsers = async () => {
            const response = await fetch(`http://localhost:3000/users`, {
                mode: 'cors'
            })

            let body = await response.json();
            setUsers(body);
        }

        function getUsernameById(id: number): string | undefined {
            const username = users.find((item) => item.id == id);
            return username?.username;
        }

        const fetchComments = async () => {
            const response = await fetch(`http://localhost:3000/comments/${book.id}`, {
                mode: 'cors'
            })

            let body = await response.json();
            setComments(body);
        };

        setBookData(prev => ({ ...prev, title: book.title, coverImage: book.cover, publicationYear: book.yearOfPub, isbn: book.isbn, description: book.desc, genre: book.category, pageCount: book.pageCount, language: book.language }));
        fetchPublisher();
        fetchPublishers();
        fetchAuthor();
        fetchAuthors();
        fetchUsers();
        fetchComments();
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setBookData(prev => ({ ...prev, [name]: value }))
    }
    const handleAuthorChange = (value: string) => {
        book.authorId =
            setBookData(prev => ({ ...prev, author: value }))
    }

    const handlePublisherChange = (value: string) => {
        setBookData(prev => ({ ...prev, publisher: value }))
    }



    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        const response = await fetch(`http://localhost:3000/books/${book.id}`, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify({ bookData })
        })

        let body = await response.json();
        console.log(body);


        setIsSaving(false)
        setIsEditing(false)

        window.location.reload();
    }

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return

        setIsSubmittingComment(true)
        const response = await fetch(`http://localhost:3000/comments`, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({ content: newComment, username: selectedUser, bookId: book.id })
        });
        setIsSubmittingComment(false)
        window.location.reload();
    }

    function getUsernameById(userId: number): ReactNode {
        const user = users.filter((user) => user.id == userId);
        return user[0]?.username;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-4xl mx-auto mb-8">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
                        {!isEditing && (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                        )}
                    </div>
                    <CardDescription>Автор:  {bookData.author}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3">
                            <img
                                src={`http://localhost:3000${book.cover}`}
                                alt={`Cover of ${book.title}`}
                                className="w-full h-auto rounded-lg shadow-md"
                            />
                        </div>
                        <div className="w-full md:w-2/3">
                            {isEditing ? (
                                <form onSubmit={handleSave} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={book.title}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="author">Author</Label>
                                            <Select onValueChange={handleAuthorChange} defaultValue={bookData.author}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Выбрать автора" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {authors.map((item: Author) => (
                                                        <SelectItem key={item.id} value={item.fio}>
                                                            {item.fio}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="publicationYear">Publication Year</Label>
                                            <Input
                                                id="publicationYear"
                                                name="publicationYear"
                                                type="number"
                                                value={bookData.publicationYear}
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
                                            <Label htmlFor="genre">Genre</Label>
                                            <Input
                                                id="genre"
                                                name="genre"
                                                value={bookData.genre}
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
                                            <Label htmlFor="publisher">Издатель</Label>
                                            <Select onValueChange={handlePublisherChange} defaultValue={bookData.publisher}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Выбрать издателя" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {publishers.map((item: Publisher) => (
                                                        <SelectItem key={item.id} value={item.name}>
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={book.desc}
                                            onChange={handleInputChange}
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                            <X className="mr-2 h-4 w-4" /> Cancel
                                        </Button>
                                        <Button type="submit" disabled={isSaving}>
                                            {isSaving ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-gray-700">{book.desc}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold">Publication Year</h3>
                                            <p>{bookData.publicationYear}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">ISBN</h3>
                                            <p>{bookData.isbn}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Genre</h3>
                                            <p>{bookData.genre}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Page Count</h3>
                                            <p>{bookData.pageCount}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Language</h3>
                                            <p>{bookData.language}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Publisher</h3>
                                            <p>{bookData.publisher}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Comments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-4">
                                <Avatar>
                                    <AvatarImage alt={comment.userId} />
                                    <AvatarFallback>{getUsernameById(Number(comment.userId))}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">{getUsernameById(Number(comment.userId))}</h4>
                                    </div>
                                    <p className="mt-1">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <Separator className="my-4" />
                <CardFooter>
                    <form onSubmit={handleCommentSubmit} className="w-full space-y-4">
                        <Textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e: any) => setNewComment(e.target.value)}
                            rows={3}
                            required
                        />

                        <div className="flex justify-between">
                            <div>
                                <Select onValueChange={(value: string) => {
                                    setSelectedUser(value);
                                }}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Выбрать пользователя" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((item: User) => (
                                            <SelectItem key={item.id} value={item.username}>
                                                {item.username}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" disabled={isSubmittingComment}>
                                {isSubmittingComment ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" /> Post Comment
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}