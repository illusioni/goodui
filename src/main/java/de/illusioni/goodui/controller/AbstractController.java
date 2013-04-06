/**
 * 
 */
package de.mnet.atlas.admin.controller;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.file.AccessDeniedException;

/**
 * [Klaus] TODO: see if I can use this, adapt it, or trash it
 * Abstract controller implementation provides basic error handling functionality for mapping exceptions to error responses.
 * 
 * @author deppisch
 *
 * @since 18.02.2013
 */
public abstract class AbstractController {

    private Logger log = LoggerFactory.getLogger(getClass());
    
    @ExceptionHandler(AtlasRuntimeException.class)
    @ResponseBody
    public HttpEntity<ErrorResponse> handleApplicationError(AtlasRuntimeException e) {
        log.error("Handle internal application exception, returning error message to client", e);
        
        return new ResponseEntity<ErrorResponse>(getErrorResponse(e), getResponseStatus(e));
    }
    
    @ExceptionHandler(NoResultException.class)
    @ResponseBody
    public HttpEntity<ErrorResponse> handleNoResultError(NoResultException e) {
        log.error("Handle no results found in database error, returning error message to client", e);
        return new ResponseEntity<ErrorResponse>(getErrorResponse("No results found in database", e), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public HttpEntity<ErrorResponse> handleAccessDenied(AccessDeniedException e) {
        log.error("Handle access denied error, returning error message to client", e);
        return new ResponseEntity<ErrorResponse>(getErrorResponse(e), HttpStatus.FORBIDDEN);
    }
    
    @ExceptionHandler(OptimisticLockException.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleError(OptimisticLockException e) {
        log.error("Handle optimistic locking error, returning error message to client", e);
        
        return new ResponseEntity<ErrorResponse>(getErrorResponse("Entity is locked by data manipulation - please refresh view and try again", e), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public HttpEntity<ErrorResponse> handleInternalError(Exception e) {
        log.error("Handle internal runtime exception, returning error message to client", e);
        
        return new ResponseEntity<ErrorResponse>(getErrorResponse(e), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    /**
     * Creates proper http response status from exception.
     * @param e
     * @return
     */
    private HttpStatus getResponseStatus(AtlasRuntimeException e) {
        return e.getResponseStatus() != null ? e.getResponseStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    }
    
    /**
     * Creates error response object with custom message.
     * @param message
     * @param e
     * @return
     */
    private ErrorResponse getErrorResponse(String message, Exception e) {
        ErrorResponse response = getErrorResponse(e);
        response.setMessage(message + " - " + response.getMessage());
        return response;
    }

    /**
     * Creates error response object from exception.
     * @param e
     * @return
     */
    private ErrorResponse getErrorResponse(Exception e) {
        ErrorResponse response = new ErrorResponse();
        
        response.setCause(e.getClass().getName());
        response.setMessage(e.getMessage());
        
        StringWriter writer = new StringWriter();
        e.printStackTrace(new PrintWriter(writer));
        
        return response;
    }
}
