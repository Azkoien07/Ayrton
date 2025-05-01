package com.ayrton.Auth.Services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "tu_clave_secreta_base64";

    // Genera el token JWT
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Valida el token JWT
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // Extrae el username del token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Verifica si el token ha expirado
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extrae la fecha de expiración
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Método genérico para extraer claims
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extrae todos los claims del token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Convierte la SECRET_KEY a un formato compatible con HMAC-SHA
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}