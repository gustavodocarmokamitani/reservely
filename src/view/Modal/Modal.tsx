// import { useEffect, useState } from "react";
// import { Service } from "../../models/Service";
// import { User } from "../../models/User";
// import { UserEmployee } from "../../models/UserEmployee";
// import { Employee } from "../../models/Employee";
// import { getTipoServico, getTipoServicoById } from "../../services/ServiceTypeServices";
// import { getFuncionarioIdByUsuarioId } from "../../services/EmployeeServices";
// import { getUsuarioById } from "../../services/UserServices";
// import { useContext } from "react";
// import { AppContext } from "../../context/AppContext";

// interface ModalProps {
//   title: string;
//   subTitle?: string;
//   servico?: boolean;
//   addProf?: boolean;
//   profissional?: boolean;
//   info?: boolean;
//   edit?: boolean;
//   editServico?: boolean;
//   imagem?: boolean;
//   handleShow: () => void;
//   handleClose: () => void;
//   fetchData: () => void;
//   size: "pequeno" | "medio" | "grande";
//   rowId?: number;
//   setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
//   setPost: React.Dispatch<React.SetStateAction<boolean>>;
// }


// interface CombinedData extends Employee, User { };

const Modal: React.FC = ({
  // handleShow,
  // handleClose,
  // title,
  // subTitle,
  // servico,
  // profissional,
  // info = false,
  // imagem,
  // size,
  // rowId,
  // edit = false,
  // addProf = false,
  // editServico = false,
  // setUpdate,
  // setPost,
}) => {
  // const [formValuesServico, setFormValuesServico] = useState<Service>({
  //   id: 0,
  //   name: "",
  //   descricao: "",
  //   valor: "",
  //   duracaoMinutos: "",
  //   active: "false",
  //   lojaId: 0
  // });

  // const [formValuesProfissional, setFormValuesProfissional] = useState<UserEmployee>({
  //   id: 0,
  //   usuarioId: 0,
  //   name: "",
  //   sobrename: "",
  //   email: "",
  //   telefone: "",
  //   active: "false",
  //   senha: "",
  //   tipoUsuarioId: 0,
  //   servicosId: [] as number[],
  // });

  // const {
  //   setUserEmployeeContext,
  //   setUserEmployeeUpdateContext
  // } = useContext(AppContext)!;

  // const [tipoServico, setTipoServico] = useState([]);
  // const [funcionario, setFuncionario] = useState<UserEmployee[]>([]);
  // const [usuario, setUsuario] = useState<User[]>([]);
  // const [combinedData, setCombinedData] = useState<CombinedData | null>(null);

  // const sizeMap = {
  //   pequeno: "650px",
  //   medio: "850px",
  //   grande: "1050px",
  // };

  // useEffect(() => {

  //   if (profissional) {
  //     const fetchTiposServico = async () => {
  //       try {
  //         const response = await getTipoServico();
  //         setTipoServico(response.data);
  //       } catch (error) {
  //         console.error("Erro ao buscar tipos de serviço", error);
  //       }
  //     };
  //     fetchTiposServico();
  //   }


  //   if (edit) {
  //     const fetchFuncionario = async () => {
  //       try {
  //         const resFuncionario = await getFuncionarioIdByUsuarioId(rowId!);

  //         let funcionarioData = Array.isArray(resFuncionario)
  //           ? resFuncionario
  //           : [resFuncionario];

  //         const mappedFuncionario = funcionarioData.map((funcionario: UserEmployee) => ({
  //           id: funcionario.id,
  //           usuarioId: funcionario.usuarioId,
  //           name: funcionario.name,
  //           sobrename: funcionario.sobrename,
  //           email: funcionario.email,
  //           telefone: funcionario.telefone,
  //           senha: funcionario.senha,
  //           active: funcionario.active,
  //           tipoUsuarioId: funcionario.tipoUsuarioId,
  //           servicosId: funcionario.servicosId || [],
  //         }));

  //         setFuncionario(mappedFuncionario);

  //         if (mappedFuncionario.length > 0) {
  //           const resUsuario = await getUsuarioById(mappedFuncionario[0].usuarioId);

  //           let usuarioData = Array.isArray(resUsuario)
  //             ? resUsuario
  //             : [resUsuario];

  //           const mappedUsuario = usuarioData.map((usuario: User) => ({
  //             id: usuario.id,
  //             name: usuario.name,
  //             sobrename: usuario.sobrename,
  //             email: usuario.email,
  //             telefone: usuario.telefone,
  //             senha: usuario.senha,
  //             tipoUsuarioId: usuario.tipoUsuarioId,
  //             lojaId: 1
  //           }));
  //           setUsuario(mappedUsuario);
  //           const combined = {
  //             ...mappedFuncionario[0],
  //             ...mappedUsuario[0],
  //           };
  //           setCombinedData(combined);
  //         }
  //       } catch (error) {
  //         console.error("Erro ao buscar tipos de serviço", error);
  //       }
  //     };
  //     fetchFuncionario();
  //   }

  //   if (editServico) {

  //     const fetchServico = async () => {


  //       const response = await getTipoServicoById(rowId!);
  //       setTipoServico(response?.data );
  //       console.log(response);

  //       fetchServico();
  //     }
  //   }
  // }, [profissional, edit, editServico]);

  // const handleSubmit = async () => {
  //   if (profissional) {
  //     const profissionalData = {
  //       ...formValuesProfissional,
  //       servicosId: formValuesProfissional.servicosId,
  //     };
  //     setUserEmployeeContext(profissionalData);
  //     setPost(true);
  //   }

  //   if (edit) {
  //     const updatedUserFunc = {
  //       id: formValuesProfissional.id,
  //       idFuncionario: 0,
  //       usuarioId: 0,
  //       tipoUsuarioId: 0,
  //       name: formValuesProfissional.name,
  //       sobrename: formValuesProfissional.sobrename,
  //       email: formValuesProfissional.email,
  //       telefone: formValuesProfissional.telefone,
  //       senha: formValuesProfissional.senha,
  //       active: formValuesProfissional.active,
  //       servicosId: formValuesProfissional.servicosId,
  //     };

  //     setUserEmployeeUpdateContext(updatedUserFunc);

  //     setUpdate(true);
  //   }
  //   handleClose();
  // };

  // const handleServiceSelection = (servicosId: number[]) => {
  //   setFormValuesProfissional((prev) => ({
  //     ...prev,
  //     servicosId,
  //   }));
  // };

  // const handleInputChangeServico = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, type, checked, value } = event.target;
  //   setFormValuesServico((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
  //   }));
  // };

  // const handleInputChangeProfissional = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, type, checked, value } = event.target;
  //   setFormValuesProfissional((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
  //   }));
  // };

  return (
    <h1>teste</h1>
//     <S.Overlay>
//       <div
//         style={{
//           background: "white",
//           padding: "20px",
//           borderRadius: "8px",
//           maxWidth: sizeMap[size],
//           width: "100%",
//         }}
//       >
//         <Row>
//           <Col md={10}>
//             <h3>{title}</h3>
//             <p>{subTitle}</p>
//           </Col>
//           <Col
//             md={2}
//             style={{ textAlign: "right", cursor: "pointer" }}
//             onClick={handleClose}
//           >
//             <img
//               src={closeIcon}
//               alt="Close Icon"
//               style={{ marginRight: "8px", verticalAlign: "middle" }}
//               width={25}
//             />
//           </Col>
//           <hr />
//         </Row>

//         {servico && (
//           <InputGroudServico
//             title={title}
//             subTitle={subTitle!}
//             handleShow={handleShow}
//             handleClose={handleClose}
//             formValuesServico={formValuesServico}
//             handleInputChange={handleInputChangeServico}
//           />
//         )}

//         {profissional && (
//           <InputGroudProfissional
//             formValuesProfissional={formValuesProfissional}
//             handleInputChange={handleInputChangeProfissional}
//             handleServiceSelection={handleServiceSelection}
//             data={tipoServico}
//             addProf
//           />
//         )}

//         {edit && (
//           <InputGroudProfissional
//             setFormValuesProfissional={setFormValuesProfissional}
//             formValuesProfissional={formValuesProfissional}
//             handleInputChange={handleInputChangeProfissional}
//             handleServiceSelection={handleServiceSelection}
//             data={combinedData ? [combinedData] : undefined}
//             edit
//           />
//         )}

//         {editServico && (
//           <InputGroudServico
//             title={title}
//             subTitle={subTitle!}
//             handleShow={handleShow}
//             handleClose={handleClose}
//             formValuesServico={formValuesServico}
//             handleInputChange={handleInputChangeServico}

//           />
//         )}

//         {info && <Selected onChange={handleServiceSelection} usuarioId={rowId} infoProf />}

//         {addProf === true ?? <Selected onChange={handleServiceSelection} usuarioId={rowId} addProf />}

//         {imagem && (
//           <Row style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//             <ImagemUpload />
//           </Row>
//         )}

//         <hr />
//         <Row>
//           <Col
//             md={12}
//             className="d-flex flex-row justify-content-center align-items-center"
//           >
//             <Button $isFechar type="button" onClick={handleClose} />
//             <Button $isConfirmar type="button" onClick={handleSubmit} />
//           </Col>
//         </Row>
//       </div>
//     </S.Overlay>
  );
};

export default Modal;
