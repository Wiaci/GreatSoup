import React from "react"
import {connect} from "react-redux";
import {handleClick} from "../store/actions/formActions";

const Graph = (props) => {

	const checkIfInArea = (x, y, r) => {
		if (r > 0) {
			return (x <= 0 && x >= -r && y <= 0 && y >= -r) ||
				(x <= 0 && y >= 0 && x * x + y * y <= r * r / 4) ||
				(x >= 0 && y >= 0 && y <= -x + r);
		} else {
			return (x >= 0 && x <= -r && y >= 0 && y <= -r) ||
				(x >= 0 && y <= 0 && x * x + y * y <= r * r / 4) ||
				(x <= 0 && y <= 0 && y >= -x + r);
		}
	}

	return (
		<svg id="svg" width="300" height="300"
		     xmlns="http://www.w3.org/2000/svg"
		     onClick={(e) => props.handleClick(e, props.r)}>
			<polygon points="150,0 144,15 156,15" stroke="black"/>
			<polygon points="300,150 285,156 285,144" stroke="black"/>

			<polygon points="150,150 150,250 50,250 50,150" fill="#c10416"/>
			<path className="svg-figure circle-figure" d="M 150 100 A 50 50, 90, 0, 0, 100 150 L 150 150 Z"
			      fill="#c10416"/>
			<polygon points="150,150 150,50 250,150" fill="#c10416"/>

			<line className="axis" x1="0" x2="300" y1="150" y2="150" stroke="black"/>
			<line className="axis" x1="150" x2="150" y1="0" y2="300" stroke="black"/>

			<line className="coor-line" x1="200" x2="200" y1="155" y2="145" stroke="black"/>
			<line className="coor-line" x1="250" x2="250" y1="155" y2="145" stroke="black"/>

			<line className="coor-line" x1="50" x2="50" y1="155" y2="145" stroke="black"/>
			<line className="coor-line" x1="100" x2="100" y1="155" y2="145" stroke="black"/>

			<line className="coor-line" x1="145" x2="155" y1="100" y2="100" stroke="black"/>
			<line className="coor-line" x1="145" x2="155" y1="50" y2="50" stroke="black"/>

			<line className="coor-line" x1="145" x2="155" y1="200" y2="200" stroke="black"/>
			<line className="coor-line" x1="145" x2="155" y1="250" y2="250" stroke="black"/>

			<text className="coor-text" x="195" y="140">R/2</text>
			<text className="coor-text" x="248" y="140">R</text>

			<text className="coor-text" x="40" y="140">-R</text>
			<text className="coor-text" x="90" y="140">-R/2</text>

			<text className="coor-text" x="160" y="105">R/2</text>
			<text className="coor-text" x="160" y="55">R</text>

			<text className="coor-text" x="160" y="205">-R/2</text>
			<text className="coor-text" x="160" y="255">-R</text>

			{props.points.map((str) => {
				let color
				if (checkIfInArea(str.x, str.y, props.r)) color = "orange"
				else color = "purple"
				return (
					<circle cx={150+str.x/props.r*100}
					        cy={150-str.y/props.r*100}
					        r="4"
					        fill={color}/>
				)
			})}
		</svg>

	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleClick: (event, r) => dispatch(handleClick(event, r))
	}
}

export default connect(null, mapDispatchToProps)(Graph)