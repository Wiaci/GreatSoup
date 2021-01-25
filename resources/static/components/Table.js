import React from "react"

const Table = (props) => {
	return (
		<div id="table-wrap">
			<table>
				<thead id="header">
				<tr>
					<th>X</th>
					<th>Y</th>
					<th>R</th>
					<th>Попадание</th>
				</tr>
				</thead>

				<tbody>
				{props.content.map((str, i) => {
					return (
						<tr key={i}>
							<td>{str.x.toFixed(3)}</td>
							<td>{str.y.toFixed(3)}</td>
							<td>{str.r.toFixed(3)}</td>
							<td>{String(str.inArea)}</td>
						</tr>
					)
				})}
				</tbody>
			</table>
		</div>
	)
}

export default Table