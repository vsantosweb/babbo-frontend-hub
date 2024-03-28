export function base64Converter(file: File, callback: (file: string) => void) {
    // Verifica se o navegador suporta a API FileReader

    if (window.FileReader) {
        var reader: any = new FileReader();

        // Evento chamado quando a leitura do arquivo é concluída
        reader.onloadend = function () {
            // O resultado é a representação em base64 do conteúdo do arquivo
            var base64Data = reader.result;

            // Chama o callback com a representação em base64 do arquivo
            callback(base64Data);
        };

        // Lê o conteúdo do arquivo como uma URL de dados
        reader.readAsDataURL(file);

    } else {
        // Se o navegador não suporta FileReader, exiba uma mensagem de erro
        alert("Desculpe, seu navegador não suporta FileReader.");
    }
}