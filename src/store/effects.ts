import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './actions';
import { ToDoService } from './service';
import { catchError, map, mergeMap, of } from 'rxjs';



@Injectable()
export class TodoEffects {

    constructor(private actions$: Actions, private todoService: ToDoService) { }

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoActions.loadTodos),
            mergeMap(() =>
                this.todoService.getAll().pipe(
                    map((todos) => TodoActions.loadTodosSuccess({ todos })),
                    catchError((error) =>
                        of(TodoActions.loadTodosFailure({ error: error.message }))
                    )
                )
            )
        )
    )
}