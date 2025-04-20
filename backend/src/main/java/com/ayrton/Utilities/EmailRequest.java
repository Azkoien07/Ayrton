package com.ayrton.Utilities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class EmailRequest {
    public String email;
    public String subject;
    public String message;
}
