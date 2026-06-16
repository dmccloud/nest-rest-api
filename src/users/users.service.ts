import { Injectable } from '@nestjs/common';

export type ROLE = 'INTERN' | 'ENGINEER' | 'ADMIN';
export type UserObjType = { name: string; email: string; role: ROLE };
export type UserObjUpdateType = { name?: string; email?: string; role?: ROLE };

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John', email: 'john@example.com', role: 'ADMIN' },
    { id: 2, name: 'Jane', email: 'jane@example.com', role: 'ENGINEER' },
    { id: 3, name: 'Jim', email: 'jim@example.com', role: 'INTERN' },
    { id: 4, name: 'Jill', email: 'jill@example.com', role: 'ADMIN' },
    { id: 5, name: 'Jack', email: 'jack@example.com', role: 'ENGINEER' },
    { id: 6, name: 'Jill', email: 'jill@example.com', role: 'INTERN' },
    { id: 7, name: 'Jack', email: 'jack@example.com', role: 'ADMIN' },
    { id: 8, name: 'Jill', email: 'jill@example.com', role: 'ENGINEER' },
    { id: 9, name: 'Jack', email: 'jack@example.com', role: 'INTERN' },
    { id: 10, name: 'Jill', email: 'jill@example.com', role: 'ADMIN' },
  ];

  findAll(role?: ROLE) {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  createUser(user: UserObjType) {
    const highestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: highestId[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updatedUser: UserObjUpdateType) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  deleteUser(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
