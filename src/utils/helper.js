import { FormatTextdirectionLToR } from "@mui/icons-material"

export const dateFormatter = (dateToformat ) =>{
    const updatedate = new Date(dateToformat);
              const year = updatedate?.getFullYear();
              const month = updatedate?.getMonth() + 1;
              const day = updatedate?.getDate();
             const studentdate = `${year}-${month}-${day}`;
             return studentdate
}