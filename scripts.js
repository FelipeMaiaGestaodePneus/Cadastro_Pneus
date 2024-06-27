document.addEventListener('DOMContentLoaded', function() {
    const generateTableButton = document.getElementById('generateTable');
    const numRowsInput = document.getElementById('numRows');
    const tableBody = document.getElementById('tableBody');

    const marcas = ['GOODYEAR', 'BRIDGESTONE', 'PROMETEON (PIRELLI)', 'MICHELIN', 'CONTINENTAL', 'HIFLY', 'XBRI', 'FIRESTONE', 'LING LONG', 'PIRELLI'];
    const modelos = {
        'GOODYEAR': ['FUEL MAX LHS', 'FUEL MAX LHD', 'G617', 'KMAX S', 'KMAX D', 'KMAX EXTREME', 'REGIONAL RHS', 'REGIONAL RHD', 'REGIONAL RHT', 'G658', 'G667', 'G291', 'KS461', 'KS481', 'AGS', 'AGD', 'URBAN MAX', 'CITYMAX', 'G665', 'ARMOR MAX MSS', 'ARMOR MAX MSD'],
        'BRIDGESTONE': ['L325', 'R163', 'R163S', 'R268 ECOPIA', 'R268 TRAILER', 'R269', 'M792 ECOPIA', 'M814', 'M842', 'R155', 'M736', 'M745'],
        'PROMETEON (PIRELLI)': ['FH:01', 'TH:01', 'FH75', 'TH75', 'FR:01', 'TR:01', 'FR85', 'TR:85', 'ST:01 PLUS', 'ST:01', 'MC:01 PLUS', 'FG:01 PLUS', 'FG:01', 'TG:01', 'FR88', 'TR88', 'FG88', 'TG88'],
        'MICHELIN': ['XMULTI Z', 'XMULTI D', 'XZA2 ENERGY', 'XMULTIWAY XZE', 'X MULTI ENERGY Z', 'XMULTI ENERGY D', 'KMAX S GEN2'],
        'CONTINENTAL': ['HS3', 'HD3', 'HTR1', 'HSR2', 'HYBRID HS3'],
        'HIFLY': ['HH102'],
        'XBRI': ['ECOPLUS'],
        'FIRESTONE': ['FS440'],
        'LING LONG': ['F860'],
        'PIRELLI': ['ASSURANCE MAXLIFE']
    };

    const medidas = ['175/70R14', '205/75R17,5', '215/75 R17.5', '235/75 R17.5', '245/70R17.5', '275/80 R22.5', '295/80 R22.5', '305/75R24.5', '315/80R22.5', '385/65R22.5'];

    const vidas = ['N', 'R1', 'R2', 'R3', 'R4', 'R5'];

    const marcasRecape = ['DREBOR', 'GOODYEAR (R)', 'VIPAL', 'RECAMIC', 'LEVORIN', 'REFFIL', 'MOREFLEX', 'BANDAG'];

    const modelosRecape = {
        'DREBOR': ['DR250', 'DDE2', 'DG167'],
        'GOODYEAR (R)': ['G600-EL', 'KMAX D', 'MIXED AP LIGHT', 'MIXED D LIGHT', 'GTL', 'KMAX AP'],
        'VIPAL': ['VL110L', 'VT100', 'VL100', 'VRT2', 'XTE-B', 'DMD2', 'LRE (250)', 'DV-RT2', 'DR250 [BX]', 'DV-RM', 'VT130', 'MHF2', 'VT130', 'BDL2', 'MHT2'],
        'RECAMIC': ['XTE-B'],
        'LEVORIN': ['LRE (250)']
    };

    const status = ['Disponível', 'Montado', 'Recapagem Pendente', 'Conserto Pendente', 'Sucateamento Pendente'];

    const marcaOptions = marcas.map(marca => `<option value="${marca}">${marca}</option>`).join('');
    const medidaOptions = medidas.map(medida => `<option value="${medida}">${medida}</option>`).join('');
    const vidaOptions = vidas.map(vida => `<option value="${vida}">${vida}</option>`).join('');
    const marcaRecapeOptions = marcasRecape.map(marca => `<option value="${marca}">${marca}</option>`).join('');
    const statusOptions = status.map(s => `<option value="${s}">${s}</option>`).join('');

    generateTableButton.addEventListener('click', function() {
        const numRows = parseInt(numRowsInput.value);

        // Limpar o conteúdo da tabela antes de gerar novas linhas
        tableBody.innerHTML = '';

        // Gerar as linhas da tabela baseadas no número inserido
        for (let i = 0; i < numRows; i++) {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><input type="number" name="fogo"></td>
                <td><select name="marca"><option value="">Selecione a marca</option>${marcaOptions}</select></td>
                <td><select name="modelo"><option value="">Selecione o modelo</option></select></td>
                <td><select name="medida"><option value="">Selecione a medida</option>${medidaOptions}</select></td>
                <td><input type="text" name="dot" maxlength="4"></td>
                <td><select name="vida" onchange="handleVidaChange(this)"><option value="">Selecione a vida</option>${vidaOptions}</select></td>
                <td><select name="marcaRecape" disabled><option value="">Selecione a marca de recape</option>${marcaRecapeOptions}</select></td>
                <td><select name="modeloRecape" disabled><option value="">Selecione o modelo de recape</option></select></td>
                <td><input type="number" name="milimetragem" min="1" max="25" step="0.1"></td>
                <td><select name="status"><option value="">Selecione o status</option>${statusOptions}</select></td>
            `;

            tableBody.appendChild(row);
        }

        // Inicializar listeners para as novas linhas
        initializeRowListeners();
    });

    // Função para inicializar event listeners para cada linha da tabela
    const initializeRowListeners = () => {
        // Adicionar event listener para seleção de marca
        document.querySelectorAll('select[name="marca"]').forEach(select => {
            select.addEventListener('change', function() {
                const selectedMarca = this.value;
                const modelosOption = modelos[selectedMarca] || [];
                const modeloSelect = this.parentNode.nextElementSibling.querySelector('select[name="modelo"]');
                modeloSelect.innerHTML = `<option value="">Selecione o modelo</option>` + modelosOption.map(modelo => `<option value="${modelo}">${modelo}</option>`).join('');
                modeloSelect.disabled = false;
            });
        });

        // Adicionar event listener para seleção de marca de recape
        document.querySelectorAll('select[name="marcaRecape"]').forEach(select => {
            select.addEventListener('change', function() {
                const selectedMarca = this.value;
                const modelosRecapeOption = modelosRecape[selectedMarca] || [];
                const modeloRecapeSelect = this.parentNode.nextElementSibling.querySelector('select[name="modeloRecape"]');
                modeloRecapeSelect.innerHTML = `<option value="">Selecione o modelo de recape</option>` + modelosRecapeOption.map(modelo => `<option value="${modelo}">${modelo}</option>`).join('');
                modeloRecapeSelect.disabled = false;
            });
        });

        // Adicionar event listener para replicar dados selecionados
        document.querySelectorAll('.replicate-button').forEach(button => {
            button.addEventListener('click', function() {
                const colName = this.dataset.col;
                const firstRowValue = tableBody.querySelector('tr:first-child [name="' + colName + '"]').value;
                const rows = tableBody.querySelectorAll('tr');

                for (let i = 1; i < rows.length; i++) {
                    const cell = rows[i].querySelector('[name="' + colName + '"]');
                    if (cell.tagName === 'SELECT') {
                        cell.value = firstRowValue;
                        const event = new Event('change');
                        cell.dispatchEvent(event);
                    } else if (cell.tagName === 'INPUT') {
                        cell.value = firstRowValue;
                    }
                }
            });
        });

        // Adicionar event listener para navegação entre células com "Enter"
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const currentInput = e.target;
                    const currentValue = currentInput.value.trim();
                    const currentRow = currentInput.closest('tr');
                    const currentCell = currentInput.closest('td');
                    const currentRowIndex = Array.from(currentRow.parentNode.children).indexOf(currentRow);
                    const currentCellIndex = Array.from(currentRow.children).indexOf(currentCell);

                    // Verificar se o campo atual não está vazio
                    if (currentValue !== '') {
                        // Encontrar o próximo input ou select na mesma coluna na linha abaixo
                        let nextRowIndex = currentRowIndex + 1;
                        let nextRow = tableBody.children[nextRowIndex];
                        while (nextRow && nextRow.children[currentCellIndex].querySelector('input, select') === null) {
                            nextRowIndex++;
                            nextRow = tableBody.children[nextRowIndex];
                        }

                        if (nextRow) {
                            const nextCell = nextRow.children[currentCellIndex].querySelector('input, select');
                            if (nextCell) {
                                nextCell.focus();
                            }
                        }
                    }
                }
            });
        });
    };

    // Função para lidar com a mudança na seleção de "Vida"
    window.handleVidaChange = (select) => {
        const vidaValue = select.value;
        const row = select.closest('tr');
        const marcaRecapeSelect = row.querySelector('select[name="marcaRecape"]');
        const modeloRecapeSelect = row.querySelector('select[name="modeloRecape"]');
        
        if (vidaValue === 'N') {
            marcaRecapeSelect.disabled = true;
            modeloRecapeSelect.disabled = true;
        } else {
            marcaRecapeSelect.disabled = false;
            modeloRecapeSelect.disabled = false;
        }
    };

    // Exportar para Excel
    const exportToExcelButton = document.getElementById('exportToExcel');
    exportToExcelButton.addEventListener('click', function() {
        // Obter todos os dados da tabela
        const rows = tableBody.querySelectorAll('tr');
        const data = [];

        rows.forEach(row => {
            const rowData = [];
            row.querySelectorAll('input, select').forEach(cell => {
                if (cell.tagName === 'INPUT') {
                    rowData.push(cell.value);
                } else if (cell.tagName === 'SELECT') {
                    rowData.push(cell.options[cell.selectedIndex].text);
                }
            });
            data.push(rowData);
        });

        // Criar um workbook do Excel
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);

        // Adicionar a worksheet ao workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Registro de Pneus');

        // Salvar o arquivo Excel
        XLSX.writeFile(wb, 'registro_pneus.xlsx');
    });
});
