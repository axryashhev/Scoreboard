import axios from "axios";
import { from, of, switchMap } from "rxjs";

class Controller {
    loadData(action) {
        return axios
            .get(action)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
                throw new Error(String(response.status));
            })
            .catch((err) => console.log("Error: ", err));
    }

    deleteRX(action) {
        console.log("delete: ", action);
        return from(axios.delete(action)).pipe(
            // eslint-disable-next-line consistent-return
            switchMap((response) => {
                console.log("response: ", response);
                if (response.status === 200) {
                    return of({ error: false, message: `Error ${response.status}` });
                }

                return of({ error: true, message: `Error ${response.status}` });
            })
        );
    }

    loadDataRX(action) {
        return from(axios.get(action)).pipe(
            // eslint-disable-next-line consistent-return
            switchMap((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                return of({ error: true, message: `Error ${response.status}` });
            })
        );
    }

    postRX(action, data) {
        return from(
            axios({
                method: "post",
                url: action,
                data,
            })
        ).pipe(
            // eslint-disable-next-line consistent-return
            switchMap((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                return of({ error: true, message: `Error ${response.status}` });
            })
        );
    }

    updateRX(action, data) {
        return from(
            axios({
                method: "put",
                url: action,
                data,
            })
        ).pipe(
            // eslint-disable-next-line consistent-return
            switchMap((response) => {
                console.log("response: ", response);
                if (response.status === 200) {
                    return of({ error: false, message: `Error ${response.status}` });
                }

                return of({ error: true, message: `Error ${response.status}` });
            })
        );
    }
}

export default Controller;
