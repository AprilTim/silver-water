import React from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";

const Login = ({state, setState}) => {

    const getData = (attribute) => {
        const form = document.querySelector(`[data-submit=${attribute}]`);

        const data = {};
        const formArray = [...form];

        formArray.forEach(item => {
            if (item.name) {
                data[item.name] = item.value;
            }
        })
        return data
    }

    const getUsers = () => {
        axios.get("/users").then((res, err) => {
            setState({...state, users: res.data})
        })
    }

    const getExpenses = () => {
        axios.get("/expenses").then((res, err) => {
            setState({...state, expenses: res.data})
        })
    }

    const deleteUser = (id) => {
        console.log(id)
        axios.delete("/user", {data: id}).then((res, err) => {

        })
    }

    const addExpense = (event) => {
        event.preventDefault();
        axios.post("/expense", {...getData("add-expense"), user: state.user.id}).then((res, err) => {
            alert("Расход добавлен!")
        })
    }

    return (
        <div>
            <div>{state.user?.login ? state.user.login : "Вход не выполнен"}</div>

            <form onSubmit={addExpense} data-submit={"add-expense"}>
                <TextField id="filled-basic" label="cost" variant="filled" name={"cost"}/>
                <TextField id="filled-basic" label="type" variant="filled" name={"type"}/>
                <Button type={"submit"} variant="contained" color="primary">
                    Добавить
                </Button>
            </form>

            <button onClick={getUsers}>Все пользователи</button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Имя</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.users?.map( user => <TableRow key={user.id}>
                        <TableCell>{user.login}</TableCell>
                        <TableCell align={"right"}><button onClick={() => deleteUser(user.id)}>Удалить</button></TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>

            <button onClick={getExpenses}>Все издержки</button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Сумма</TableCell>
                        <TableCell>Тип</TableCell>
                        <TableCell>Пользователь</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.expenses?.map( expense => <TableRow key={expense.id}>
                        <TableCell>{expense.cost}</TableCell>
                        <TableCell>{expense.type}</TableCell>
                        <TableCell>{expense.user.login}</TableCell>
                        <TableCell align={"right"}><button onClick={() => deleteUser(expense.id)}>Удалить</button></TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    );
};

export default Login;