package com.ayrton.Utilities.Exception;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.graphql.execution.DataFetcherExceptionResolverAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@Component
public class GraphQLExceptionResolver extends DataFetcherExceptionResolverAdapter {

    @Override
    protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {

        // Caso: el argumento no pudo ser convertido a Long (error de GraphQLArgumentBinder)
        if (ex.getClass().getName().contains("GraphQlArgumentBinder$ArgumentsBindingResult")) {
            return GraphqlErrorBuilder.newError(env)
                    .message("Invalid input: ID must be a number.")
                    .errorType(graphql.ErrorType.ValidationError)
                    .build();
        }

        // Error de tipo simple como fallback
        if (ex instanceof MethodArgumentTypeMismatchException) {
            return GraphqlErrorBuilder.newError(env)
                    .message("Invalid parameter type: expected number.")
                    .errorType(graphql.ErrorType.ValidationError)
                    .build();
        }

        // Tu excepción personalizada
        if (ex instanceof CustomException customEx) {
            return GraphqlErrorBuilder.newError(env)
                    .message(customEx.getMessage())
                    .errorType(graphql.ErrorType.DataFetchingException)
                    .build();
        }

        // Default: otro error inesperado
        return GraphqlErrorBuilder.newError(env)
                .message("Unexpected server error: " + ex.getMessage())
                .errorType(graphql.ErrorType.DataFetchingException)
                .build();
    }
}
