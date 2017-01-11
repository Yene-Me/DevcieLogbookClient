import {
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
    selector: 'app-todos',
    providers: [TodoService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './todos.component.html',
})
export class TodosComponent implements OnDestroy, OnInit {

    private todos: Todo;
    private subscription: Subscription;

    constructor(
        private todoService: TodoService,
        private ref: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        this.subscription = this.todoService.todos$.subscribe((todos: Todo[]) => {
            this.todos = todos;
            console.log("sss",this.todos);
            this.ref.markForCheck();
        }, (err) => {
            console.error(err);
        });
        this.todoService.find();
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}