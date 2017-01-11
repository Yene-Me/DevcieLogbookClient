import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as io from 'socket.io-client';
import * as feathers from 'feathers-client';

import { APIService } from '../api.service';
import { Todo } from './todo';

@Injectable()
export class TodoService extends APIService {

    public todos$: Observable<Todo[]>;
    private todosObserver: Observer<Todo[]>;
    private feathersService: any;
    private dataStore: {
        todos: Todo[]
    };

    constructor() {
        super();

        const socket = io(this.url);
        const feathersApp = feathers().configure(feathers.socketio(socket));
        this.feathersService = feathersApp.service('users');

        this.feathersService.on('created', (todo) => this.onCreated(todo));
        this.feathersService.on('updated', (todo) => this.onUpdated(todo));
        this.feathersService.on('removed', (todo) => this.onRemoved(todo));

        this.todos$ = new Observable(observer => this.todosObserver = observer)
            .share();

        this.dataStore = { todos: [] };
    }

    public find() {
        this.feathersService.find((err, todos: Todo[]) => {
            if (err) return console.error(err);
            this.dataStore.todos = todos.data;
            this.todosObserver.next(this.dataStore.todos);
        });
    }

    private getIndex(id: string): number {
        let foundIndex = -1;

        for (let i = 0; i < this.dataStore.todos.length; i++) {
            if (this.dataStore.todos[i].id === id) {
                foundIndex = i;
            }
        }

        return foundIndex;
    }

    private onCreated(todo: Todo) {
        this.dataStore.todos.push(todo);
        this.todosObserver.next(this.dataStore.todos);
    }

    private onUpdated(todo: Todo) {
        const index = this.getIndex(todo.id);

        this.dataStore.todos[index] = todo;

        this.todosObserver.next(this.dataStore.todos);
    }

    private onRemoved(todo) {
        const index = this.getIndex(todo.id);

        this.dataStore.todos.splice(index, 1);

        this.todosObserver.next(this.dataStore.todos);
    }

}