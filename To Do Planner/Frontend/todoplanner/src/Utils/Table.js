import React from "react";

const Table=(props)=>{
 const list = props.list;
 return(
    <>
    <table className="Main-table" cellPadding={10}>
        <thead>
            <tr>
                <th>Task</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Description</th>
                <th>Asignee</th>
                <th>Level</th>
                <th>Status</th>
                <th>RCA</th>
            </tr>
        </thead>
        <tbody>
          {
                list.map((e)=>{
                    return(
                        <tr key = {e.task}>
                        <td>{e.task}</td>
                        <td>{e.sdate}</td>
                        <td>{e.edate}</td>
                        <td>{e.description}</td>
                        <td>{e.asignee}</td>
                        <td>{e.level}</td>
                        <td>{e.status}</td>
                        <td>{e.rca}</td>
                        <td>
                            <div className="Action-buttons">
                                <div><button className="Actions">Update</button></div>
                                <div><button className="Actions">Delete</button></div>
                            </div>
                        </td>
                        </tr>
                    );
                })}
        </tbody>
    </table>
    </>
 );
}

export default Table;