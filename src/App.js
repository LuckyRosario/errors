import React, { useState } from "react";
import Navigation from "./navbar"
import Greeting from "./greeting";

//create your first component
const App = () => {
	const [selectedRadio, setSelectedRadio] = useState("no");

	const HandleChangeValue = (e) => {
		setSelectedRadio(e.target.value);
	};
	const [file, setFile] = useState();
	const [array, setArray] = useState([]);

	const fileReader = new FileReader();

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	const csvFileToArray = (string) => {
		const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
		const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

		const array = csvRows.map((i) => {
			const values = i.split(",");
			const obj = csvHeader.reduce((object, header, index) => {
				object[header] = values[index];
				return object;
			}, {});
			return obj;
		});

		setArray(array);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				csvFileToArray(text);
			};

			fileReader.readAsText(file);
		}
	};

	const headerKeys = Object.keys(Object.assign({}, ...array));

	return (
		<>
		<Navigation />
		<div className="container mb-5">
			
			<Greeting />
			<p>
				We have successfully submitted your ACA Reporting. The IRS
				accepted this filing. However, it has come back as “accepted
				with errors.” That means at least one name or SSN on the 1095-C
				Forms submitted did not precisely match what the IRS has in its
				database. The list of employees is on the following page.
			</p>
			<strong>
				After reviewing the list on page 2, please choose one of the
				following options:
			</strong>
			<div className="radio mt-3">
				<input
					id="no"
					name="radioButton"
					type="radio"
					value={"no"}
					onChange={HandleChangeValue}
					defaultChecked
				/>
				<label htmlFor="no">
					<strong>
						No, I will not be submitting any corrections. This
						completes my ACA Reporting.
					</strong>
					<p>
						In our experience, the IRS has not found it necessary to
						receive additional clarification for the listed
						employees. It would be considered acceptable to leave
						the filing as is without submitting any further
						corrections.
					</p>
				</label>
			</div>
			<div className="radio radio-yes">
				<input
					id="yes"
					name="radioButton"
					type="radio"
					value={"yes"}
					onChange={HandleChangeValue}
				/>
				<label htmlFor="yes">
					<strong>
						Yes, I will be submitting corrections on the following
						page within 30 days.
					</strong>
					<p>
						In our experience, we have found the most effective way
						to address these errors is to have the employee call the
						IRS Customer Service at 800-829-1040. An employer cannot
						call to confirm exactly how the IRS has the information
						listed.{" "}
					</p>
					<p>Be sure they confirm:</p>
					<ul>
						<li>SSN</li>
						<li>FIRST NAME</li>
						<li>MIDDLE NAME or INITIAL</li>
						<li>LAST NAME</li>
					</ul>
					<p>
						We recommend that they check the spelling, including any
						hyphens or spaces. For compound names, please be sure to
						verify exactly how the IRS has them in its database.
					</p>
				</label>
			</div>
			<p className="mt-3">
				<strong>
					Please upload your csv document containing the errors and
					updated information here.
				</strong>
			</p>
			<div style={{ textAlign: "center" }}>
				<form>
					<input
						disabled={selectedRadio === "no"}
						type={"file"}
						id={"csvFileInput"}
						accept={".csv"}
						onChange={handleOnChange}
					/>

					<button
						className="rounded-pill btn btn-success"
						disabled={selectedRadio === "no"}
						onClick={(e) => {
							handleOnSubmit(e);
						}}>
						IMPORT CSV
					</button>
				</form>

				<br />
				<div className="container m-3">
				<table className="text-center table">
					<thead className="thead-light">
						<tr scope="col" key={"header"}>
							{headerKeys.map((key) => (
								<th>{key}</th>
							))}
						</tr>
					</thead>

					<tbody>
						{array.map((item) => (
							<tr scope="row" key={item.id}>
								{Object.values(item).map((val) => (
									<td>{val}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				</div>
			</div>
			<p>
				<strong>Deadline:</strong>
			</p>
			<p>
				To assure a prompt response, corrections must be submitted
				before this document’s 30-day expiration window. We will notify
				you if we receive another IRS ERROR NOTIFICATION after
				submitting this data. However, we will not resubmit any further
				corrections.
			</p>
			<p>
				If no corrections are submitted before the document expires, we
				will take that as an indication that no further corrections will
				be submitted, and that your ACA reporting for the year is now
				complete.
			</p>
			<p>Please give us a call us if you have any questions.</p>
			<p>
				<strong>
					We have compiled these additional tips to help guide you:
				</strong>
			</p>
			<ul>
				<li>
					Typically, incorrect names are the cause for IRS ERROR
					NOTIFICATIONS, not SSNs.
				</li>
				<li>
					This could mean there is an incorrect SSN.{" "}
					<em>
						Also, it might result from a situation where a form was
						submitted under the name Mike Brown when it should have
						been submitted for Michael Brown.
					</em>{" "}
				</li>
				<li>
					Social Security Cards do not specify which portion of the
					name is the first, middle, or last name. This is especially
					important when there is more than just a first and last
					name.
				</li>
				<li>
					Various forms of government ID may not all use the same
					name.
					<em>
						If the name on a State (Driver License) or Local
						document (School ID) is different from a Federal
						document (Passport, SSN Card), use the Federal document.
					</em>
				</li>
				<li>Be sure to remove any spaces before or after a name.</li>
				<li>
					Only hyphens (“-“) are accepted as special characters for a
					person’s name.{" "}
				</li>
				<li>
					If the employee changed names and forgot to update it with
					the IRS, we recommend the filling be done with the former
					name, which the IRS has on file.{" "}
				</li>
			</ul>
			<p>
				<strong>
					Here are variations for the name Louis Alfanso Diaz
					Fernandez:
				</strong>
			</p>
			<div className="">
				<div className="row">
					<div className="col">Luis Diaz</div>
					<div className="col">Luis Diaz Fernandez</div>
					<div className="col"> Luis D Fernandez</div>
				</div>
				<div className="row">
					<div className="col">Luis A. Diaz</div>
					<div className="col"> Luis Alfonso Diaz</div>
					<div className="col">Luis Fernandez Diaz</div>
				</div>
				<div className="row">
					<div className="col">Luis Alfonso Diaz-Fernandez</div>
					<div className="col">Luis-Alfonso Diaz Fernandez</div>
					<div className="col">Luis-Alfonso D Fernandez</div>
				</div>
				<div className="row">
					<div className="col">
						Lucho Diaz (“Lucho” is used as a nickname for “Luis”)
					</div>
					<div className="col">Luis F Diaz</div>
					<div className="col"></div>
				</div>
			</div>
		</div>
		</>
	);
};

export default App;
