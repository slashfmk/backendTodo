import express from "express";

import {FieldInfo, MysqlError} from "mysql";

const db = require("../database/db_config");

// TODO new todo
export const addTodo = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const {title, description} = req.body;

    //@ts-ignore
    if (!title || !description)
        return next({message: "Please fill out all fields!!"});

    try {
        //@ts-ignore
        let sql = `insert into todo (title, description, done) values (?, ?, ?)`;

        db.query(
            sql,
            [title, description, true],
            (error: MysqlError, results: any, fields: FieldInfo[]) => {
                if (error) return next(error.message);
                res.status(200).json({
                    message: "todo added successfully!",
                });

                return next();
            });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

// TODO get todos
export const getAllTodos = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    let sql = `select * from todo`;

    try {
        db.query(sql, (error: MysqlError, results: any, fields: FieldInfo[]) => {
            if (error) return next(error.message);
            res.status(200).json(results);

            next();
        });

    } catch (e) {
        console.log(e);
        next(e);
    }
};

// TODO get a specific todo
export const getSpecificTodo = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const key = req.params.id;

    let sql = `select * from todo where id =?`;

    try {
        db.query(
            sql,
            [key],
            (error: MysqlError, results: any, fields: FieldInfo[]) => {
                if (error) return next(error.message);
                res.status(200).json({
                    results,
                });
                next();
            }
        );

    } catch (e) {
        console.log(e);
        next(e);
    }
};

// TODO delete todo
export const deleteTodo = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const key = req.params.id;
    if (!key) return next({message: "No id provided!!"});

    let sql = `delete from todo where id = ?`;

    try {
        db.query(
            sql,
            [key],
            (error: MysqlError, results: any, fields: FieldInfo[]) => {
                if (error) return next(error.message);
                res.status(200).json({
                    message: `todo successfully deleted!!`,
                });
                next();
            }
        );

    } catch (e) {
        console.log(e);
        next(e);
    }
};

// TODO edit todo
export const editTodo = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const key = req.params.id;
    if (!key) return next({message: "No id provided!!"});

    let sqlSelect = `select * from todo where id =?`;
    let sqlUpdate = `update todo set done = ?  where id = ?`;

    try {
        db.query(
            sqlSelect,
            [key],
            (error: MysqlError, results: any, fields: FieldInfo[]) => {
                if (error) return next(error.message);
                const found = results;

                if(found.length !== 1) return next({"message": "No such id"});

                db.query(sqlUpdate, [!found[0].done, key], (error2: MysqlError, result2: any) => {
                    if (error2) return next(error2.message);

                    res.status(200).json({
                        message: `todo successfully updated!!`,
                    });
                    next();
                });
            }
        );

    } catch (e) {
        console.log(e);
        next(e);
    }
};
