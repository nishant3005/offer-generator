import React from 'react'
import styles from './Login.module.css';
import logFunc from './LoginLogoutFunc';
const Login = () => {


    const { login, logout, loading, setLoading } = logFunc();
    function loginHandler() {

      login()
    }

    return (
        <div className={styles.form}>
        <div className={styles.title}>Authentication</div>
            <button className={styles.btn} onClick={loginHandler}>Sign in with Google</button>
        </div>
    )
}

export default Login