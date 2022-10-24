import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
	providedIn: 'root'
})
export class Functions {
	private _loading_tools: string = `${environment.URL_SERVE}assets/image/tools.gif`;
    loadingFloatingTools(): any {
        return Swal.fire({
            html: `<img src="${this._loading_tools}" width="30" style="margin-bottom: 10px;">`,
            width: 100,
            padding: '0.2em',
            background: '#fff',
            backdrop: 'rgb(0 0 0 / 30%)',
            showConfirmButton: false,
            showCloseButton: false,
            showCancelButton: false,
            allowOutsideClick: false
        });
    }
	formatMoney(number) {
		return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	}
	inTwoDigits(number): string {
		return (`0${number}`).slice(-2)
	}
	generateColorRandom() {
		return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
	}
    floatingValue(number): number {
        return Math.round(number * 100) / 100;
    }
}