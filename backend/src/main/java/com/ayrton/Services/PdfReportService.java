package com.ayrton.Services;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import org.springframework.stereotype.Service;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfReportService {

    public ByteArrayInputStream generateReport(List<String[]> data, String title) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);

            // Title
            document.add(new Paragraph(title)
                    .setFont(PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD))
                    .setFontSize(18));

            document.add(new Paragraph("\n"));

            if (!data.isEmpty()) {
                String[] headers = data.get(0);
                Table table = new Table(headers.length);

                // Headers
                for (String header : headers) {
                    table.addHeaderCell(header);
                }

                // Rows
                for (int i = 1; i < data.size(); i++) {
                    for (String value : data.get(i)) {
                        table.addCell(value);
                    }
                }

                document.add(table);
            } else {
                document.add(new Paragraph("No hay datos para mostrar."));
            }

            document.close();
            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {
            throw new RuntimeException("Error al generar el PDF", e);
        }
    }
}