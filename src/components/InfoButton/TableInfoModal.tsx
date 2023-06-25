export function TableInfoModal() {
  return (
    <div className="flex flex-col gap-5 ">
      <p>
        Digite a proposição desejada no input e veja os detalhes da sua
        tabela-verdade e outras informações.
      </p>
      <p>
        Caso a proposição seja inválida, o input ficará com a borda{" "}
        <span className="text-red-500">vermelha</span> e o resultado da
        proposição não será calculado (caso você já tenha calculado alguma
        proposição válida anteriormente, seu resultado continuará sendo exibido
        no lugar da inválida). Por proposição inválida, enquadra-se qualquer
        proposição que não está prevista na lógica proposicional formal ou não é
        calculável pelo app.
      </p>
      <p>
        Por exemplo, a proposição <i className="text-red-500">AB∧C</i> não está
        descrita na lógica formal (ou seja, é inválida), já que segundo a mesma,
        é preferível não utilizar AND&apos;s implícitos na expressão, logo, a
        expressão só seria válida caso fosse{" "}
        <i className="text-green-500">A∧B∧C</i>.
      </p>
      <i>
        A aplicação considera para seus cálculos, que cada letra da expressão
        representa apenas uma variável única, na qual se atribuem os valores
        lógicos. Portanto, seguindo o alfabeto, são possíveis até 26 variáveis
        únicas na mesma expressão formal.
      </i>

      <h1 className="font-bold">Operadores Lógicos</h1>
      <p>
        Você pode usar o teclado no canto inferior da tela para inserir os
        operadores lógicos ou digitar os atalhos correspondentes diretamente no
        input.
      </p>
      <div className="flex flex-col justify-center gap-5 font-mono border-l-4 border-white rounded-sm py-1 px-3">
        <div className="flex items-center font-mono">
          <b className="w-24">∧ ou ·</b>
          <span className="italic">Atalho no input: AND</span>
        </div>
        <div className="flex items-center font-mono">
          <b className="w-24">∨ ou +</b>
          <span className="italic">Atalho no input: OR</span>
        </div>
        <div className="flex items-center font-mono">
          <b className="w-24">¬</b>
          <span className="italic">Atalho no input: NOT</span>
        </div>
        <div className="flex items-center font-mono">
          <b className="w-24">⟶</b>
          <span className="italic">Atalho no input: COND</span>
        </div>
        <div className="flex items-center font-mono">
          <b className="w-24">⟷</b>
          <span className="italic">Atalho no input: BCOND</span>
        </div>
        <div className="flex items-center font-mono">
          <b className="w-24">⟹</b>
          <span className="italic">Atalho no input: IMPL</span>
        </div>
        <div className="flex items-center font-mono">
          <b className="w-24">⟺</b>
          <span className="italic">Atalho no input: EQUIV</span>
        </div>
        <div className="flex items-center font-mono">
          <b className="w-24">⊕</b>
          <span className="italic">Atalho no input: XOR</span>
        </div>
      </div>
    </div>
  );
}
