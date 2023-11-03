import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showList: false,
      listUser: [],
      isAdmin: false,
      reset: 0,
    };
  }

  componentDidMount(){
    this.checkAdmin();
  }

  hienThiDanhSach = () => {
    console.log(typeof this.state.user)

    let accessToken = Cookies.get('accessToken');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("/users/me", requestOptions)
      .then(response => response.text())
      .then(result => {
        try {
          let jsonResult = JSON.parse(result);
          this.state.user = jsonResult;
          this.setState({
            showList: true // Chỉ cập nhật thuộc tính showList, giữ nguyên user
          });
          console.log(this.state.user);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      })
      .then(() => { console.log(this.state.showList) })
      .catch(error => console.log('error', error));
  }

  logOut = () => {
    Cookies.remove('accessToken');
    window.location.href = "/login";
  }

  checkAdmin = () => {
    let accessToken = Cookies.get('accessToken');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch('/users/', requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log(1);
          this.setState({
            isAdmin: true,
          })
          console.log("nguoi dung la admin")
          return response.json();
        } else {
          console.log("nguoi dung ko la admin")
          this.setState({
            isAdmin: false
          })
          throw new Error('Lỗi khi kiểm tra quyền admin');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  layDanhSachNguoiDung = () => {
    let accessToken = Cookies.get('accessToken');
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("/users/", requestOptions)
      .then(response => response.text())
      .then(result => {
        let jsonResult = JSON.parse(result);
        console.log(typeof jsonResult)
        console.log(typeof this.state.listUser)
        console.log(jsonResult)
        this.state.listUser = jsonResult;
        this.setState({
          reset: this.state.reset + 1,
        })
      })
      .then(() => console.log(this.state.listUser))
      .catch(error => console.log('error', error));
  }

  render() {
    let listDataUser;
    let buttonGetAll;
    let danhSachNguoiDung;
    if (this.state.showList) {
      listDataUser = <List>
        <ListItem disablePadding>
          <ListItemText>username: {this.state.user.username}</ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>create at: {this.state.user.created_at}</ListItemText>
        </ListItem>
      </List>
    }
    if (this.state.isAdmin) {
      buttonGetAll = <Button variant="contained" onClick={this.layDanhSachNguoiDung}>
        Lay danh sach nguoi dung
      </Button>;
      danhSachNguoiDung = <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell>id</TableCell>
              <TableCell>Active?</TableCell>
              <TableCell>Admin?</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.listUser.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.is_active.toString()}</TableCell>
                <TableCell>{user.is_superuser.toString()}</TableCell>
                <TableCell>{user.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }

    return (
      <>
        <div>Home</div>
        <Button variant="contained" onClick={this.hienThiDanhSach}>
          Thong tin ca nhan
        </Button>
        <>{listDataUser}</>
        <Button variant="contained" onClick={this.logOut}>
          Log out
        </Button>
        <>{buttonGetAll}</>
        <>{danhSachNguoiDung}</>
      </>
    )
  }
}
