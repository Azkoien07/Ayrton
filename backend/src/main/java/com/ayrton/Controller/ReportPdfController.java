package com.ayrton.Controller;

import com.ayrton.Services.PdfReportService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@Controller
public class ReportPdfController {

    private final PdfReportService pdfReportService;

    public ReportPdfController(PdfReportService pdfReportService) {
        this.pdfReportService = pdfReportService;
    }

    @QueryMapping
    public String generateReportPDF() throws IOException {
        List<String[]> data = List.of(
                new String[]{"ID", "Nombre", "Correo"},
                new String[]{"1", "Gabriel Cáceres", "gabriel@email.com"},
                new String[]{"2", "Laura Torres", "laura@email.com"}
        );

        ByteArrayInputStream pdfStream = pdfReportService.generateReport(data, "Reporte de Usuarios");

        byte[] pdfBytes = pdfStream.readAllBytes();
        return Base64.encodeBase64String(pdfBytes);
    }
}

