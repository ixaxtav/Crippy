import React from "react";
import PropTypes from "prop-types";
import cc from "cryptocompare";
import "babel-polyfill";
import _ from "lodash";

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "dashboard",
			favorites: ["BTC", "ETH", "XMR", "DOGE"],
			...this.savedSettings(),
			setpage: this.setPage,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			confirmFavorites: this.confirmFavorites
		};
	}

	componentDidMount = () => {
		this.fetchCoins();
	};

	fetchCoins = async () => {
		let coinList = (await cc.coinList()).Data;
		this.setState({ coinList });
	};

	addCoin = key => {
		let favorites = [...this.state.favorites];
		if (favorites.length < MAX_FAVORITES) {
			favorites.push(key);
			this.setState({ favorites });
		}
	};

	removeCoin = key => {
		let favorites = [...this.state.favorites];
		this.setState({ favorites: _.pull(favorites, key) });
	};

	confirmFavorites = () => {
		this.setState({
			firstVisit: false,
			page: "dashboard"
		});
		localStorage.setItem(
			"Crippy",
			JSON.stringify({
				text: "hello"
			})
		);
	};

	savedSettings() {
		let crippyData = JSON.parse(localStorage.getItem("Crippy"));
		if (!crippyData) {
			return { page: "settings", firstVisit: true };
		}
		return {};
	}

	setPage = page => this.setState({ page });

	render() {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}

AppProvider.propTypes = {
	children: PropTypes.array
};
