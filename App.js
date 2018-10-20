import React, { Component } from "react";
import { AppRegistry } from "react-native";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-client-preset";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Container, Header, Content, Footer, Left, Right, Title, Body, Button, Text, Grid, Row, Form, Item, Label, Input, View, Icon } from "native-base";
import MyForm from "./components/Form";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.client = new ApolloClient({
			link: new HttpLink({ uri: "http://10.10.10.1:4000" }),
			cache: new InMemoryCache().restore({}),
		});
	}

	render() {
		return (
			<ApolloProvider client={this.client}>
				<Container>
					<Header>
						<Left>
							<Icon type="FontAwesome" name="home" style={{color:"white"}} />
						</Left>
						<Body>
							<Title>Weight Tracker</Title>
						</Body>
						<Right />
					</Header>
					<Content>
						<MyForm />
					</Content>
					<Footer style={{ backgroundColor: "#fff" }} />
				</Container>
			</ApolloProvider>
		);
	}
}

AppRegistry.registerComponent("app", () => App);
