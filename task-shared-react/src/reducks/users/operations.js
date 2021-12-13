import axios from 'axios';
import {signInAction} from './actions';
import { isValidRequiredInput } from '../../function/common';
import { push } from 'connected-react-router';
import { hideLoadingAction, showLoadingAction } from '../loading/actions'
import {URL} from '../../URL'

const domain = '@kcska.onmicrosoft.com';

// ローカルストレージ
const APP_KEY = 'token';

export const signUp = (username, uid, password) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('Sign up...'));
    if( !isValidRequiredInput(username, uid, password) ){
      dispatch(hideLoadingAction());
      alert("必須項目が未入力です。");
      return false;
    }
    if( password.length < 6 ){
      dispatch(hideLoadingAction());
      alert('パスワードは6文字以上で入力してください。');
      return false;
    }
    if(uid.length !== 8){
      dispatch(hideLoadingAction());
      alert('学籍番号が8文字ではありません');
      return false;
    }
    let data = JSON.stringify({
      name: username,
      user_id: uid,
      email: uid + domain,
      password: password,
      isSignedIn: false,
      auth: false,
    });
    const SignUpUrl = `${URL}signup`;
    // const SignUpUrl = "http://10.24.106.218/api/signup";
    // const SignUpUrl = "http://10.24.106.157/api/signup";
    // const SignUpUrl = "http://localhost/api/signup";

    return await axios.post(SignUpUrl, data,{headers:{"Content-Type": "application/json"}})
      .then(response => {
        alert("アカウントの作成が完了しました。登録して頂いた学籍番号のメールアドレスにメールをお送りしましたので確認をお願いします。");
        dispatch(push('/signin'))
        dispatch(hideLoadingAction());
      })
      .catch(error => {
        dispatch(hideLoadingAction());
        throw new Error(error);
      })
  }
}

export const passChange = (uid) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('Sign up...'));
    if( !isValidRequiredInput(uid) ){
      dispatch(hideLoadingAction());
      alert("必須項目が未入力です。");
      return false;
    }
    if(uid.length !== 8){
      dispatch(hideLoadingAction());
      alert('学籍番号が8文字ではありません');
      return false;
    }
    const url = `${URL}me/${uid}`;
    // const url = `http://10.24.106.218/api/me/${uid}`;
    // const url = `http://10.24.106.157/api/me/${uid}`;
    // const url = `http://localhost/api/me/${uid}`;

    return await axios.get(url, {headers:{"Content-Type": "application/json"}})
      .then(response => {
        if(!response.data){
          alert('ユーザが存在しませんでした。')
          dispatch(hideLoadingAction());
          return false;
        }
        alert("パスワードの再発行が完了しました。登録して頂いた学籍番号のメールアドレスにメールをお送りしましたので確認をお願いします。");
        dispatch(push('/signin'))
        dispatch(hideLoadingAction());
      })
      .catch(error => {
        dispatch(hideLoadingAction());
        throw new Error(error);
      })
  }
}

export const signIn = (uid, password) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('Sign in...'));
    if( !isValidRequiredInput(uid, password) ){
        dispatch(hideLoadingAction());
      alert('学籍番号かパスワードが未入力です。');
      return false;
    }
    let data = JSON.stringify({
      id: uid,
      password: password,
    });
    const SingnInUrl = `${URL}signin`;
    // const SingnInUrl = "http://10.24.106.218/api/signin";
    // const SingnInUrl = "http://10.24.106.157/api/signin";
    // const SingnInUrl = "http://localhost/api/signin";
    // ログイン情報とinitislStateをLaravelに渡す。
    return await axios.post(SingnInUrl, data,{headers:{"Content-Type": "application/json"}})
      .then(response => {
        const userState = response.data;
        if( !userState ) {
          throw new Error('ユーザ情報を取得できません。');
        }

        localStorage.setItem(APP_KEY, userState.remember_token);

        if(userState.isSignedIn === 1 && userState.auth === 1){
          dispatch(signInAction({
            isSignedIn: true,
            user_id: userState.user_id,
            name: userState.name,
            password: userState.password,
            auth: true,
            email: userState.email
          }))
          dispatch(push(`/mypage/${userState.user_id}`));
          dispatch(hideLoadingAction());
          // alert('ログインに成功しました。');
        }else {
          dispatch(hideLoadingAction());
          alert("ログインができていないか、認証が完了していません。");
          return false;
        }
        
      })
      .catch( error => {
        dispatch(hideLoadingAction());
        alert('失敗');
      })
  }
}

export const listenAuthState = () => {
  return (dispatch) => {
    let apitoken = localStorage.getItem(APP_KEY);
    const meUrl = `${URL}me/${apitoken}`;
    // const meUrl = `http://10.24.106.218/api/me/${apitoken}`;
    // const meUrl = `http://10.24.106.157/api/me/${apitoken}`;
    // const meUrl = `http://localhost/api/me/${apitoken}`;
    return axios.get(meUrl, {headers:{"Content-Type": "application/json"}})
    .then(response =>{
      if(!response.data){
        dispatch(push('/signin'));
        return;
      }else {
        const userState = response.data[0];
        if(!userState){
          dispatch(push('/signin'));
          return;
        }
        console.log(userState);
        dispatch(signInAction({
          isSignedIn: true,
          user_id: userState.user_id,
          name: userState.name,
          password: userState.password,
          auth: true,
          email: userState.email
        }))
      }
      
    })
  }
}

const SingnOutUrl = `${URL}signout`;
// const SingnOutUrl = "http://localhost/api/signout";
// const SingnOutUrl = "http://10.24.106.218/api/signout";
// const SingnOutUrl = "http://10.24.106.157/api/signout";
export const signOut = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;

    const data = JSON.stringify({
      id: uid
    });
    await axios.post(SingnOutUrl, data,{headers:{"Content-Type": "application/json"}})
    .then( () => {

        dispatch(signInAction({
          isSignedIn: false,
          user_id: "",
          name: "",
          password: "",
          auth: false,   // ここはメール認証機能をつけたら戻り値を設定する
          email: ""
        }))
        localStorage.setItem(APP_KEY, "");
        dispatch(push('/signin'))
        alert('ログアウトしました。');
      
    })
    .catch( error => {
      console.log(error)
      alert('失敗しました。');
    })
  }
}