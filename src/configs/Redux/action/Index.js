import swal from 'sweetalert';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, push, onValue, set, remove } from "firebase/database";


export const UserRegister = (data) => (dispatch) => {
    return new Promise((resolve, rejected) => {
        const auth = getAuth();
        if (data.password === data.passwordConfirm) {

            dispatch({ type: "CHANGE_LOADING", payload: true })

            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(() => {
                    swal({
                        title: "Success!",
                        text: "You have been create e new account.",
                    });

                    dispatch({ type: "CHANGE_LOADING", payload: false })
                    resolve();

                }).catch(error => {

                    dispatch({ type: "CHANGE_LOADING", payload: false })

                    swal({

                        title: "Error!",
                        text: error.message,
                    });

                    rejected();
                })
        } else {
            swal({
                title: "Error!",
                text: "Password tidak sama",
            });

            rejected();
        }
    })
}




export const UserLogin = (data) => (dispatch) => {
    return new Promise((resolve, rejected) => {

        dispatch({ type: "CHANGE_LOADING", payload: true })

        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(res => {
                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid,
                    emailVerified: res.user.emailVerified,
                    refreshToken: res.user.refreshToken
                }

                localStorage.setItem("user", JSON.stringify(dataUser))

                console.log('login berhasil', dataUser)

                dispatch({ type: "CHANGE_LOADING", payload: false })
                dispatch({ type: "CHANGE_LOGIN", payload: true })
                dispatch({ type: "CHANGE_USER", payload: dataUser })
                resolve();

            }).catch(error => {
                let pesan = "Sign in Error!"

                if (error.message === "Firebase: Error (auth/wrong-password).") {
                    pesan = "Error! Password salah."
                } else if (error.message === "Firebase: Error (auth/user-not-found).") {
                    pesan = "Error!, Email/Username tidak ditemukan"
                } else {
                    return pesan;
                }

                swal({
                    title: "Login Gagal!",
                    text: pesan,
                    icon: "error"
                });
                dispatch({ type: "CHANGE_LOADING", payload: false })
                dispatch({ type: "CHANGE_LOGIN", payload: false })
                rejected();
            })
    })
}

export const UserLogout = () => (dispatch) => {
    return new Promise((resolve, reject) => {

        swal({
            text: "Yakin mau keluar?",
            buttons: true,
            dangerMode: true,
        })
            .then((logout) => {
                if (logout) {

                    const auth = getAuth();
                    signOut(auth).then(() => {

                        localStorage.removeItem("user")
                        dispatch({ type: "CHANGE_USER", payload: {} })
                        dispatch({ type: "CHANGE_LOGIN", payload: false })
                        resolve();

                    }).catch((error) => {

                        reject(new Error(error.message));

                    });
                }
            });



    })
}

export const AddDataToFirebase = (data) => (dispatch) => {

    if (data.userId) {
        const db = getDatabase();

        push(ref(db, 'notes/' + data.userId), {
            content: data.content,
            title: data.title,
            tanggal: JSON.stringify(data.tanggal)
        });
        swal({
            title: "Notes sukses di tambah",
            icon: "success"
        });

    } else {
        swal({
            title: "Harus Login terlebih dahulu!",
            icon: "error"
        });
    }
}

export const ReadDataToFirebase = (userId) => (dispatch) => {

    const db = getDatabase();
    const starCountRef = ref(db, `notes/${userId}`);
    onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {

            const data = snapshot.val();
            const obj = Object.entries(data).map(res => {
                return {
                    id: res[0],
                    title: res[1].title,
                    content: res[1].content,
                    tanggal: res[1].tanggal
                }
            })
            console.log("Read Data Re-render")
            dispatch({ type: "SET_NOTES", payload: obj })


        } else {
            dispatch({ type: "SET_NOTES", payload: [] })

        }
    });
}

export const UpdateDataToFirebase = (userId, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const db = getDatabase();
        if (data.id) {
            set(ref(db, `notes/${userId.uid}/${data.id}`), {
                content: data.content,
                title: data.title,
                tanggal: JSON.stringify(data.tanggal)
            });
            swal({
                title: "Update sukses!",
                icon: "success"
            });

        } else {
            swal({
                title: "ID notes tidak di temukan",
                icon: "error"
            });
        }


    })
}

export const DeleteDataToFirebase = (userId, data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const db = getDatabase();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (data.id && willDelete) {

                    remove(ref(db, `notes/${userId.uid}/${data.id}`), {
                        content: data.content,
                        title: data.title,
                        tanggal: data.tanggal
                    })

                    swal(`"${data.title}" dihapus!.`, {
                        icon: "success",
                    });

                }
                else {
                    swal("Hapus di batalkan");
                }
            });
    });
}
