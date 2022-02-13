export class Connector {
	get connected() {
		return !!this._address;
	}
}
