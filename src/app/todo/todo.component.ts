import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../store/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store';
import { todoSelector } from '../../store/selectors';
import * as TodoActions from '../../store/actions';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todos$: Observable<Todo[]> | undefined;
  isLoading$: Observable<boolean> | undefined;

  constructor(private store: Store<AppState>) {
    this.todos$ = this.store.select(todoSelector);
    this.isLoading$ = this.store.select(state => state.todo.loading);
    this.loadTodos();
  }

  loadTodos() {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo(index: number) {
    const todo: Todo = {id: index, description: "New Todo", completed: false};
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }

  complete(todo: Todo) {
    this.store.dispatch(TodoActions.updateTodo({todo: {...todo, completed: true}}));
  }

}
