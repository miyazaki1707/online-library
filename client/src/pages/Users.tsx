import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

interface User {
    id: number,
    username: string
}

export const Users = () => {
    const [userName, setUserName] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`http://localhost:3000/users`, {
                mode: 'cors'
            });
            let body = await response.json();
            setUsers(body);
        }

        fetchUsers();
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
                            <Button variant="ghost">Пользователи</Button>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='mb-6' variant="default">Добавить пользователя</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Добавление пользователя</DialogTitle>
                        </DialogHeader>

                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Пользователь</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={userName}
                                    onChange={(e: any) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="default" onClick={async () => {
                                    const response = await fetch('http://localhost:3000/users', {
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        mode: 'cors',
                                        method: 'POST',
                                        body: JSON.stringify({ username: userName })
                                    });
                                    setUserName('');
                                    window.location.reload();
                                }}>
                                    Сохранить
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                {users.map((pb: User) => (
                    <React.Fragment key={pb.id}>
                        <div className="bg-white flex items-center justify-between mb-2 rounded-lg shadow-md overflow-hidden transition-transform">
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800 mb-1 truncate">{pb.username}</h3>
                            </div>
                            <Button onClick={async (e: any) => {
                                const response = await fetch(`http://localhost:3000/users/${pb.id}`, {
                                    mode: 'cors',
                                    method: 'DELETE'
                                });
                                window.location.reload();
                            }} className='mr-4' variant="default">Удалить</Button>
                        </div>
                    </React.Fragment>
                ))}

            </main>
        </div >
    )
}
