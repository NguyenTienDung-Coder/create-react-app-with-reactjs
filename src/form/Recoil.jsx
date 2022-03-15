import {atom} from 'recoil';

export const reactMembers = atom({
    key: 'reactMembers', 
    default: [
        { name: "Đinh Tuấn Anh", age: 20 },
        { name: "Ngụy Minh Thắng", age: 21 },
        { name: "Nguyễn Anh Thư", age: 22 }
    ]
});

export const javaMembers = atom({
    key: 'javaMembers', 
    default: [
        { name: "Bế Trọng Hiếu", age: 20 },
        { name: "Ngô Huỳnh Đức", age: 21 },
        { name: "Nguyễn Mạnh Dũng", age: 18 }
    ]
});

export const editInfo = atom({
    key: 'editInfo', 
    default: {}
});