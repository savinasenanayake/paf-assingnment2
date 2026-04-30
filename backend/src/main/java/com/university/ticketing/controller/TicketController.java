package com.university.ticketing.controller;

import com.university.ticketing.model.Comment;
import com.university.ticketing.model.Ticket;
import com.university.ticketing.model.TicketStatus;
import com.university.ticketing.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    private final TicketRepository ticketRepository;

    public TicketController(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @GetMapping
    public List<Ticket> listTickets() {
        return ticketRepository.findAll();
    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<Ticket> getTicket(@PathVariable String ticketId) {
        return ticketRepository.findById(ticketId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody TicketRequest request) {
        if (request.attachments != null && request.attachments.size() > 3) {
            return ResponseEntity.badRequest().build();
        }

        Ticket ticket = new Ticket();
        ticket.setResourceName(request.resourceName);
        ticket.setLocation(request.location);
        ticket.setCategory(request.category);
        ticket.setDescription(request.description);
        ticket.setPriority(request.priority);
        ticket.setContactName(request.contactName);
        ticket.setContactEmail(request.contactEmail);
        ticket.setContactPhone(request.contactPhone);
        ticket.setAttachments(request.attachments != null ? request.attachments : List.of());
        ticket.setCreatedAt(Instant.now());
        ticket.setUpdatedAt(Instant.now());

        return ResponseEntity.status(HttpStatus.CREATED).body(ticketRepository.save(ticket));
    }

    @PatchMapping("/{ticketId}/status")
    public ResponseEntity<Ticket> updateTicketStatus(@PathVariable String ticketId, @RequestBody StatusUpdateRequest request) {
        Optional<Ticket> optional = ticketRepository.findById(ticketId);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Ticket ticket = optional.get();
        if (request.status != null) {
            ticket.setStatus(request.status);
        }
        if (request.assignedTo != null) {
            ticket.setAssignedTo(request.assignedTo);
        }
        if (request.resolutionNotes != null) {
            ticket.setResolutionNotes(request.resolutionNotes);
        }
        ticket.setUpdatedAt(Instant.now());
        return ResponseEntity.ok(ticketRepository.save(ticket));
    }

    @PutMapping("/{ticketId}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable String ticketId, @RequestBody TicketRequest request) {
        return ticketRepository.findById(ticketId)
                .map(ticket -> {
                    ticket.setResourceName(request.resourceName);
                    ticket.setLocation(request.location);
                    ticket.setCategory(request.category);
                    ticket.setDescription(request.description);
                    ticket.setPriority(request.priority);
                    ticket.setContactName(request.contactName);
                    ticket.setContactEmail(request.contactEmail);
                    ticket.setContactPhone(request.contactPhone);
                    if (request.attachments != null) {
                        ticket.setAttachments(request.attachments);
                    }
                    ticket.setUpdatedAt(Instant.now());
                    return ResponseEntity.ok(ticketRepository.save(ticket));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{ticketId}")
    public ResponseEntity<Void> deleteTicket(@PathVariable String ticketId) {
        if (!ticketRepository.existsById(ticketId)) {
            return ResponseEntity.notFound().build();
        }
        ticketRepository.deleteById(ticketId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{ticketId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable String ticketId, @RequestBody CommentRequest request) {
        Optional<Ticket> optional = ticketRepository.findById(ticketId);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Ticket ticket = optional.get();
        Comment comment = new Comment();
        comment.setAuthorName(request.authorName);
        comment.setContent(request.content);
        comment.setCreatedAt(Instant.now());
        comment.setUpdatedAt(Instant.now());
        ticket.getComments().add(comment);
        ticket.setUpdatedAt(Instant.now());
        ticketRepository.save(ticket);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    @PutMapping("/{ticketId}/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable String ticketId,
                                                 @PathVariable String commentId,
                                                 @RequestBody CommentRequest request) {
        Optional<Ticket> optional = ticketRepository.findById(ticketId);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Ticket ticket = optional.get();
        Optional<Comment> existingComment = ticket.getComments().stream()
                .filter(comment -> comment.getId().equals(commentId))
                .findFirst();
        if (existingComment.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Comment comment = existingComment.get();
        if (request.authorName == null || !request.authorName.equals(comment.getAuthorName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        comment.setContent(request.content);
        comment.setUpdatedAt(Instant.now());
        ticketRepository.save(ticket);
        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("/{ticketId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String ticketId,
                                              @PathVariable String commentId,
                                              @RequestParam String authorName) {
        Optional<Ticket> optional = ticketRepository.findById(ticketId);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Ticket ticket = optional.get();
        Optional<Comment> existingComment = ticket.getComments().stream()
                .filter(comment -> comment.getId().equals(commentId))
                .findFirst();
        if (existingComment.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Comment comment = existingComment.get();
        if (!authorName.equals(comment.getAuthorName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ticket.getComments().remove(comment);
        ticket.setUpdatedAt(Instant.now());
        ticketRepository.save(ticket);
        return ResponseEntity.noContent().build();
    }

    public static class TicketRequest {
        public String resourceName;
        public String location;
        public String category;
        public String description;
        public String priority;
        public String contactName;
        public String contactEmail;
        public String contactPhone;
        public List<String> attachments;
    }

    public static class StatusUpdateRequest {
        public TicketStatus status;
        public String assignedTo;
        public String resolutionNotes;
    }

    public static class CommentRequest {
        public String authorName;
        public String content;
    }
}
