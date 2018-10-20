import React from "react";
import { Mutation } from "react-apollo";
import { AppRegistry, View } from "react-native";
import gql from "graphql-tag";
import { Button, Text, Form, Item, Label, Input, Spinner } from "native-base";
import { kgToGm } from "../utils/convertor";

const ADD_WEIGHT = gql`
	mutation ADD_WEIGHT($gms: Float!) {
		addWeight(gms: $gms) {
			id
		}
	}
`;

class MyForm extends React.Component {
	state = {
		gms: "",
	};

	render() {
		return (
			<Mutation mutation={ADD_WEIGHT}>
				{(addWeight, { loading, error }) => {
					if (loading)
						return (
							<View style={{ alignSelf: "center" }}>
								<Spinner color="blue" />
							</View>
						);
					return (
						<View>
							<Form>
								<Item stackedLabel>
									<Label>Weight</Label>
									<Input
										value={this.state.gms}
										keyboardType="numeric"
										onChangeText={text => {
											this.setState({ gms: text });
										}}
									/>
								</Item>
							</Form>
							<Button
								full
								onPress={async () => {
									const result = await addWeight({ variables: { gms: kgToGm(parseFloat(this.state.gms)) } });
									this.setState({ gms: "" });
									console.log(result);
								}}
								style={{
									marginTop: 20,
								}}
							>
								<Text>Add</Text>
							</Button>
						</View>
					);
				}}
			</Mutation>
		);
	}
}

export default MyForm;
