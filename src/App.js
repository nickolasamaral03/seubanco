import './App.css';
import styled from 'styled-components';
import Estilosglobais from './Components/EstilosGlobais/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/index.jsx';
import Inicio from './Components/Inicio/index.jsx';
import Cadastro from './Components/NaoCadastro/index.jsx';
import Moradia from './Components/Categorias/moradia.jsx';
import Alimentacao from './Components/Categorias/alimentação.jsx';
import Contas from './Components/Categorias/contas.jsx';
import Dividas from './Components/Categorias/dividas.jsx';
import Educacao from './Components/Categorias/educacao.jsx';
import Lazer from './Components/Categorias/lazer.jsx';
import Outros from './Components/Categorias/outros.jsx';
import Saude from './Components/Categorias/saude.jsx';
import Transporte from './Components/Categorias/transporte.jsx';
import Vestuario from './Components/Categorias/vestuario.jsx';
import InicioAcompanhar from './Components/Acompanhar/inicio.jsx';
import DefinirMoradia from './Components/Acompanhar/definirmoradia.jsx';
import DefinirAlimentacao from './Components/Acompanhar/definiralimantacao.jsx';
import DefinirContas from './Components/Acompanhar/definircontas.jsx';
import DefinirDivida from './Components/Acompanhar/definirdivida.jsx';
import DefinirEducacao from './Components/Acompanhar/definireducacao.jsx';
import DefinirLazer from './Components/Acompanhar/definirlazer.jsx';
import DefinirOutros from './Components/Acompanhar/definiroutros.jsx';
import DefinirSaude from './Components/Acompanhar/definirsaude.jsx';
import DefinirTransporte from './Components/Acompanhar/definirtransporte.jsx';
import GastoTotal from './Components/Acompanhar/gastostotais.jsx';
import { useEffect, useState } from 'react';
import DefinirVestuario from './Components/Acompanhar/definirvestuario.jsx';
import Anotacao from './Components/Anotacao/index.jsx';
import Layout from './Components/Layout.js';

const Fundo = styled.div`
background: #4E865C;
width: 100%;
min-height: 100vh;
`

function App() {
  const [dadosMoradia, setDadosMoradia] = useState(() => {
    const moradiaSalva = localStorage.getItem("dadosMoradia")
    return moradiaSalva ? JSON.parse(moradiaSalva) : []
  })

  const [dadosAlimentacao, setDadosAlimentacao] = useState(() => {
    const alimentacaoSalva = localStorage.getItem("dadosAlimentacao")
    return alimentacaoSalva ? JSON.parse(alimentacaoSalva) : []
  })

  const [dadosTransporte, setDadosTransporte] = useState(() => {
    const transporteSalva = localStorage.getItem("dadosTransporte")
    return transporteSalva ? JSON.parse(transporteSalva) : []
  })

  const [dadosContas, setDadosContas] = useState(() => {
    const contasSalva = localStorage.getItem("dadosContas")
    return contasSalva ? JSON.parse(contasSalva) : []
  })

  const [dadosLazer, setDadosLazer] = useState(() => {
    const lazerSalva = localStorage.getItem("dadosLazer")
    return lazerSalva ? JSON.parse(lazerSalva) : []
  })

  const [dadosVestuario, setDadosVestuario] = useState(() => {
    const VestuarioSalva = localStorage.getItem("dadosVestuario")
    return VestuarioSalva ? JSON.parse(VestuarioSalva) : []
  })

  const [dadosDividas, setDadosDividas] = useState(() => {
    const DividasSalva = localStorage.getItem("dadosDividas")
    return DividasSalva ? JSON.parse(DividasSalva) : []
  })

  const [dadosSaude, setDadosSaude] = useState(() => {
    const SaudeSalva = localStorage.getItem("dadosSaude")
    return SaudeSalva ? JSON.parse(SaudeSalva) : []
  })

  const [dadosEducacao, setDadosEducacao] = useState(() => {
    const EducacaoSalva = localStorage.getItem("dadosEducacao")
    return EducacaoSalva ? JSON.parse(EducacaoSalva) : []
  })

  const [dadosOutros, setDadosOutros] = useState(() => {
    const OutrosSalva = localStorage.getItem("dadosOutros")
    return OutrosSalva ? JSON.parse(OutrosSalva) : []
  })

  const [dadosRenda, setDadosRenda] = useState(() => {
    const RendaSalva = localStorage.getItem("dadosRenda")
    return RendaSalva ? JSON.parse(RendaSalva) : []
  }
  )

  useEffect(() => {
    localStorage.setItem("dadosRenda", JSON.stringify(dadosRenda))
  }
  ,[dadosRenda])

  useEffect(() => {
    localStorage.setItem("dadosOutros", JSON.stringify(dadosOutros))
  },[dadosOutros])


  useEffect(() => {
    localStorage.setItem("dadosContas", JSON.stringify(dadosContas))
  }, [dadosContas])

  useEffect(() => {
    localStorage.setItem("dadosTransporte", JSON.stringify(dadosTransporte))
  }, [dadosTransporte])

  useEffect(() => {
    localStorage.setItem("dadosAlimentacao", JSON.stringify(dadosAlimentacao))
  }, [dadosAlimentacao])

  useEffect(() => {
    localStorage.setItem("dadosMoradia", JSON.stringify(dadosMoradia))
  }, [dadosMoradia])

  useEffect(() => {
    localStorage.setItem("dadosLazer", JSON.stringify(dadosLazer))
  }, [dadosLazer])

  useEffect(() => {
    localStorage.setItem("dadosVestuario", JSON.stringify(dadosVestuario))
  }, [dadosVestuario])

  useEffect(() => {
    localStorage.setItem("dadosDividas", JSON.stringify(dadosDividas))
  }, [dadosDividas])

  useEffect(() => {
    localStorage.setItem("dadosSaude", JSON.stringify(dadosSaude))
  }, [dadosSaude])

  useEffect(() => {
    localStorage.setItem("dadosEducacao", JSON.stringify(dadosEducacao))
  }, [dadosEducacao])

  const ValorRenda = (rendavalor) => {
    setDadosRenda(rendavalor.rendaConfirmada)
  }

  const ValoresMoradia = (moradiavalues) => {
      setDadosMoradia(moradiavalues)
  }
  const ValoresAlimentacao = (AlimentacaoValores) => {
      setDadosAlimentacao(AlimentacaoValores)
  }
  const ValoresContas = (ContasValores) => {
      setDadosContas(ContasValores)
  }
  const ValoresDividas = (DividasValores) => {
      setDadosDividas(DividasValores)
  }
  const ValoresEducacao = (EducacaoValores) => {
      setDadosEducacao(EducacaoValores)
  }
  const ValoresLazer = (LazerValores) => {
      setDadosLazer(LazerValores)
  }
  const ValoresVestuario = (VestuarioValores) => {
      setDadosVestuario(VestuarioValores)
  }
  const ValoresSaude = (SaudeValores) => {
      setDadosSaude(SaudeValores)
  }
  const ValoresTransporte = (TransporteValores) => {
      setDadosTransporte(TransporteValores)
  }

const ValoresOutros = (OutrosValores) => {
  setDadosOutros((prevDadosOutros) => {
      // Verifica se prevDadosOutros é um array; caso contrário, inicia como vazio
      const dadosAtuais = Array.isArray(prevDadosOutros) ? prevDadosOutros : [];
      console.log(dadosAtuais) //recebendo
      return [...dadosAtuais, OutrosValores];
  });
};

  const [totalSaude, setTotalSaude] = useState(() => {
    const SaudeTotalSalvo = localStorage.getItem("totalSaude")
    return SaudeTotalSalvo ? JSON.parse(SaudeTotalSalvo) : []
  });

  useEffect(() => {
    localStorage.setItem("totalSaude", JSON.stringify(totalSaude))
  }, [totalSaude])

  const [totalEducacao, setTotalEducacao] = useState(() => {
    const EducacaoTotalSalvo = localStorage.getItem("totalEducacao")
    return EducacaoTotalSalvo ? JSON.parse(EducacaoTotalSalvo) : []
  });

  useEffect(() => {
    localStorage.setItem("totalEducacao", JSON.stringify(totalEducacao))
  }, [totalEducacao])

  const atualizarGastosSaude = (valor) => {
    setTotalSaude(valor);
  };

  const atualizarGastosEducacao = (valor) => {
    setTotalEducacao(valor);
  };

  const [totalMoradia, setTotalMoradia] = useState(() => {
    const MoradiaTotalSalvo = localStorage.getItem("totalMoradia")
    return MoradiaTotalSalvo ? JSON.parse(MoradiaTotalSalvo) : []
  });

  useEffect(() => {
    localStorage.setItem("totalMoradia", JSON.stringify(totalMoradia))
  },[totalMoradia])

  const atualizarGastosMoradia = (valor) => {
    setTotalMoradia(valor);
  };

  const [totalLazer, setTotalLazer] = useState(() => {
    const LazerTotalSalvo = localStorage.getItem("totalLazer")
    return LazerTotalSalvo ? JSON.parse(LazerTotalSalvo) : []
  });

  useEffect(() => {
    localStorage.setItem("totalLazer", JSON.stringify(totalLazer))
  }, [totalLazer]);

  const atualizarGastosLazer = (valor) => {
    setTotalLazer(valor);
  }

  const [totalTransporte, setTotalTransporte] = useState(() => {
    const TransporteTotalSalvo = localStorage.getItem("totalTransporte")
    return TransporteTotalSalvo ? JSON.parse(TransporteTotalSalvo) : []
  })

  useEffect(() => {
    localStorage.setItem("totalTransporte", JSON.stringify(totalTransporte))
  },[totalTransporte])

  const atualizarGastosTransporte = (valor) => {
    setTotalTransporte(valor)
  }

  const [totalDivida, setTotalDivida] = useState(() => {
    const DividaTotalSalvo = localStorage.getItem("totalDivida")
    return DividaTotalSalvo ? JSON.parse(DividaTotalSalvo) : []
  })

  useEffect(() => {
    localStorage.setItem("totalDivida", JSON.stringify(totalDivida))
  }, [totalDivida])

  const atualizarGastosDivida = (valor) => {
    setTotalDivida(valor)
  }

  const [totalVestuario, setTotalVestuario] = useState(() => {
    const VestuarioTotalSalvo = localStorage.getItem("totalVestuario")
    return VestuarioTotalSalvo ? JSON.parse(VestuarioTotalSalvo) : []
  })

  useEffect(() => {
    localStorage.setItem("totalVestuario", JSON.stringify(totalVestuario))
  }, [totalVestuario])

  const atualizarGastosVestuario = (valor) => {
    setTotalVestuario(valor)
  }

  const [totalAlimentacao, setTotalAlimentacao] = useState(() => {
    const AlimentacaoTotalSalvo = localStorage.getItem("totalAlimentacao")
    return AlimentacaoTotalSalvo ? JSON.parse(AlimentacaoTotalSalvo) : []
  })

  useEffect(() => {
    localStorage.setItem("totalAlimentacao", JSON.stringify(totalAlimentacao))
  }, [totalAlimentacao])

  const atualizarGastosAlimentacao = (valor) => {
    setTotalAlimentacao(valor)
  }

  const [totalContas, setTotalContas] = useState(() => {
    const ContasTotalSalvo = localStorage.getItem("totalContas")
    return ContasTotalSalvo ? JSON.parse(ContasTotalSalvo) : []
  })

  useEffect(() => {
    localStorage.setItem("totalContas", JSON.stringify(totalContas))
  }, [totalContas])

  const atualizarGastosContas = (valor) => {
    setTotalContas(valor)
  }

  const [totalOutros, setTotalOutros] = useState(() => {
    const OutroTotalSalvo = localStorage.getItem("totalOutros")
    return OutroTotalSalvo ? JSON.parse(OutroTotalSalvo) : []
  })

  useEffect(() => {
    localStorage.setItem("totalOutros", JSON.stringify(totalOutros))
  }, [totalOutros])

  const atualizarGastosOutros = (valor) => {
    setTotalOutros(valor)
  }

  const [limitesOutros, setLimitesOutros] = useState(() => {
    const OutroLimiteSalvo = localStorage.getItem("limitesOutros")
    return OutroLimiteSalvo ? JSON.parse(OutroLimiteSalvo) : []
  })

  useEffect(() => {
    localStorage.setItem("limitesOutros", JSON.stringify(limitesOutros))
  }, [limitesOutros])

  const atualizarLimitesOutros = (valor) => {
    setLimitesOutros(valor)
  }

  return (
    <Fundo>
      <Estilosglobais/>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>

          <Route element={<Layout/>}>
          <Route path='/inicio' element={<Inicio PegandoRendadoUsuario={ValorRenda}/>}/>
          <Route path='/acompanhar' element={<InicioAcompanhar valuesOutrosAcom={dadosOutros}/>}/>
          
          <Route path='/moradia' element={<Moradia PegandoValores={ValoresMoradia}/>}/>
          <Route path='/alimentacao' element={<Alimentacao PegandoValoresAlimentacao={ValoresAlimentacao}/>}/>
          <Route path='/contas' element={<Contas PegandoValoresContas={ValoresContas}/>}/>
          <Route path='/dividas' element={<Dividas PegandoValoresDividas={ValoresDividas}/>}/>
          <Route path='/educacao' element={<Educacao PegandoValoresEducacao={ValoresEducacao}/>}/>
          <Route path='/lazer' element={<Lazer PegandoValoresLazer={ValoresLazer}/>}/>
          <Route path='/vestuario' element={<Vestuario PegandoValoresVestuario={ValoresVestuario}/>}/>
          <Route path='/outros' element={<Outros PegandoValoresdoOutro={ValoresOutros}/>}/>
          <Route path='/saude' element={<Saude PegandoValoresSaude={ValoresSaude}/>}/>
          <Route path='/transporte' element={<Transporte PegandoValoresTransporte={ValoresTransporte}/>}/>

          <Route path='/definirmoradia' element={<DefinirMoradia valuesMoradia={dadosMoradia} atualizarGastosTotaisMoradia={atualizarGastosMoradia}/>}/>
          <Route path='/definiralimentacao' element={<DefinirAlimentacao valuesAlimentacao={dadosAlimentacao} atualizarGastosTotaisAlimentacao={atualizarGastosAlimentacao}/>}/>
          <Route path='/definircontas' element={<DefinirContas valuesContas={dadosContas} atualizarGastosTotaisContas={atualizarGastosContas}/>}/>
          <Route path='/definirdivida' element={<DefinirDivida valuesDividas={dadosDividas} atualizarGastosTotaisDivida={atualizarGastosDivida}/>}/>
          <Route path='/definireducacao' element={<DefinirEducacao valuesEducacao={dadosEducacao} atualizarGastosTotaisEducacao={atualizarGastosEducacao}/>}/>
          <Route path='/definirlazer' element={<DefinirLazer valuesLazer={dadosLazer} atualizarGastosTotaisLazer={atualizarGastosLazer}/>}/>
          <Route path='/definiroutros' element={<DefinirOutros valuesOutros={dadosOutros} atualizarGastosTotaisOutros={atualizarGastosOutros} atualizarLimitesTotaisOutros={atualizarLimitesOutros}/>}/>
          <Route path='/definirsaude' element={<DefinirSaude valuesSaude={dadosSaude} atualizarGastosTotais={atualizarGastosSaude}/>}/>
          <Route path='/definirtransporte' element={<DefinirTransporte valuesTransportes={dadosTransporte} atualizarGastosTotaisTransporte={atualizarGastosTransporte}/>}/>
          <Route path='/definirvestuario' element={<DefinirVestuario valuesVestuario={dadosVestuario} atualizarGastosTotaisVestuario={atualizarGastosVestuario}/>}/>
          <Route path='/definirtotal' element={<GastoTotal valuesMoradia={dadosMoradia} valuesAlimentacao={dadosAlimentacao} valuesContas={dadosContas} valuesOutros={limitesOutros} valuesDividas={dadosDividas} valuesEducacao={dadosEducacao} valuesLazer={dadosLazer} valuesSaude={dadosSaude} valuesTransportes={dadosTransporte} valuesVestuario={dadosVestuario} valuesTotalSaude={totalSaude} valuesTotalEducacao={totalEducacao} valuesTotalMoradia={totalMoradia} valuesTotalLazer={totalLazer} valuesTotalTransporte={totalTransporte} valeusTotalDivida={totalDivida} valuesTotalVestuario={totalVestuario} valuesTotalAlimentacao={totalAlimentacao} valuesTotalContas={totalContas} valuesTotalOutros={totalOutros} dadosRenda={dadosRenda}
          />}/>

          <Route path='/anotacao' element={<Anotacao/>}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </Fundo>
  );
}

export default App;
