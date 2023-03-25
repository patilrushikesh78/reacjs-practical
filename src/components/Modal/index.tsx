import React, { useState } from "react";
import { ITab } from "../../modals/ITab";
import "./Styles.css";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import tabAction from "../../Actions/tabAction";

type Props = {
  onClose: () => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 20px;
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const Table = styled.table`
  border-collapse: collapse;
  margin: 20px;
  width: 600px;
  border: 1px solid gray;
`;

const TableRow = styled.tr`
  border: 1px solid gray;
  background-color: lightgray;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid gray;
`;

const Button = styled.button`
  background-color: #0077cc;
  color: white;
  border: none;
  padding: 10px 10px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
`;

export default function AddTab(props: Props) {
  const tabs = useSelector((state: RootState) => state.tabs).Tabs;
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ITab>();
  const [position, setPosition] = useState(-1);
  const [editName, setEditName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEditChange = (e: any) => {
    setEditName(e.target.value);
  };

  const addCategory = () => {
    if (name == "") {
      alert("Please enter category name.");
      return;
    }
    let categories: ITab[] = tabs;
    if (categories.length == 5) {
      alert("You can only add 5 tabs.");
      return;
    }

    let flag = categories.some((item) => {
      return item.name.toLowerCase() == name.toLowerCase();
    });
    if (flag) {
      alert("Category already exist.");
    } else {
      let id = categories[categories.length - 1].id;
      let newCat: ITab = {
        id: id + 1,
        name,
        serach: "",
        category: "",
        brand: "",
        minPrice: 0,
        maxPrice: 200,
        minDiscount: 0,
        maxDiscount: 100,
      };
      categories.push(newCat);
      dispatch(tabAction.addTab(categories));
      props.onClose();
    }
  };

  const editCategory = () => {
    if (editName == "") {
      alert("Please enter category name.");
      return;
    }
    let categories: ITab[] = tabs;
    // let flag = categories.some((item, index) => {
    //   return item.name.toLowerCase() == editName.toLowerCase();
    // });
    // if (flag) {
    //   alert("Category already exist.");
    // } else {
    categories[position].name = editName;
    dispatch(tabAction.addTab(categories));
    onClear();
    // }
  };

  const onClear = () => {
    setEdit(undefined);
    setPosition(-1);
    setEditName("");
  };

  const onDelete = (cat: ITab) => {
    let categories: ITab[] = tabs;
    if (categories.length == 1) {
      return;
    }

    let newList: ITab[] = categories.filter((item) => {
      return item.name != cat.name;
    });
    console.log(newList);
    dispatch(tabAction.deleteTabs(newList, categories[0]));
    // dispatch(tabAction.changeTab(categories[0]));
    props.onClose();
  };

  const onEdit = (category: ITab, index: number) => {
    setEdit(category);
    setEditName(category.name);
    setPosition(index);
  };

  return (
    <div className="modal">
      <Container>
        {edit != undefined ? (
          <>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>
                    <Input
                      value={editName}
                      placeholder="Please enter tab name"
                      type="text"
                      onChange={handleEditChange}
                    />
                  </TableHeader>
                  <TableHeader>
                    <Button onClick={editCategory} type="button">
                      Update
                    </Button>
                  </TableHeader>
                  <TableHeader>
                    <Button onClick={onClear} type="button">
                      Close
                    </Button>
                  </TableHeader>
                </TableRow>
              </thead>
            </Table>
          </>
        ) : (
          <>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>
                    <Input
                      placeholder="Please enter tab name"
                      value={name}
                      type="text"
                      onChange={handleChange}
                    />
                  </TableHeader>
                  <TableHeader>
                    <Button onClick={addCategory} type="button">
                      Add Tab
                    </Button>
                  </TableHeader>
                  <TableHeader>
                    <Button onClick={props.onClose} type="button">
                      Close
                    </Button>
                  </TableHeader>
                </TableRow>
              </thead>
            </Table>

            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Action</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {tabs.map((item: ITab, index: number) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Button
                          onClick={(evt) => onEdit(item, index)}
                          type="button"
                        >
                          Edit
                        </Button>
                        <Button type="button" onClick={(evt) => onDelete(item)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                    // <div key={"" + index}>
                    //   <h3>{item.name}</h3>
                    //   {item.name.toLowerCase() != "home" && (
                    //     <>
                    //       <button
                    //         onClick={(evt) => onEdit(item, index)}
                    //         type="button"
                    //       >
                    //         Edit
                    //       </button>
                    //       <button onClick={(evt) => onDelete(item)}>
                    //         Delete
                    //       </button>
                    //     </>
                    //   )}
                    // </div>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </div>
  );
}
