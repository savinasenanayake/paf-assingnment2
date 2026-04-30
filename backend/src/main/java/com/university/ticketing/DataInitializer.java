package com.university.ticketing;

import com.university.ticketing.model.Comment;
import com.university.ticketing.model.Ticket;
import com.university.ticketing.model.TicketStatus;
import com.university.ticketing.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    private final TicketRepository ticketRepository;

    public DataInitializer(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public void run(String... args) {
        if (ticketRepository.count() == 0) {
            Ticket sampleOne = new Ticket();
        sampleOne.setResourceName("Projector 4B");
        sampleOne.setLocation("Engineering Building, Room 4B");
        sampleOne.setCategory("Equipment Failure");
        sampleOne.setDescription("The room projector is showing a blank screen during startup and cannot display presentations.");
        sampleOne.setPriority("High");
        sampleOne.setContactName("Maya Silva");
        sampleOne.setContactEmail("maya.silva@university.edu");
        sampleOne.setContactPhone("+1 555-0182");
        sampleOne.setStatus(TicketStatus.OPEN);
        sampleOne.setCreatedAt(Instant.now().minusSeconds(3600));
        sampleOne.setUpdatedAt(Instant.now().minusSeconds(3600));

        Comment sampleCommentOne = new Comment();
        sampleCommentOne.setAuthorName("Campus Support");
        sampleCommentOne.setContent("Ticket created and assigned to the AV technician.");
        sampleCommentOne.setCreatedAt(Instant.now().minusSeconds(3500));
        sampleCommentOne.setUpdatedAt(Instant.now().minusSeconds(3500));
        sampleOne.getComments().add(sampleCommentOne);

        Ticket sampleTwo = new Ticket();
        sampleTwo.setResourceName("Chemistry Lab B2");
        sampleTwo.setLocation("Science Center, Lab B2");
        sampleTwo.setCategory("Maintenance Request");
        sampleTwo.setDescription("Water leak is appearing under the main sink and the floor is slippery.");
        sampleTwo.setPriority("Critical");
        sampleTwo.setContactName("David Kim");
        sampleTwo.setContactEmail("david.kim@university.edu");
        sampleTwo.setContactPhone("+1 555-0104");
        sampleTwo.setStatus(TicketStatus.IN_PROGRESS);
        sampleTwo.setAssignedTo("Technician Rhea");
        sampleTwo.setCreatedAt(Instant.now().minusSeconds(7200));
        sampleTwo.setUpdatedAt(Instant.now().minusSeconds(1800));

        Comment sampleCommentTwo = new Comment();
        sampleCommentTwo.setAuthorName("Technician Rhea");
        sampleCommentTwo.setContent("Leak source identified. Replacement seal has been ordered and repair is scheduled for later today.");
        sampleCommentTwo.setCreatedAt(Instant.now().minusSeconds(1700));
        sampleCommentTwo.setUpdatedAt(Instant.now().minusSeconds(1700));
        sampleTwo.getComments().add(sampleCommentTwo);

        Ticket sampleThree = new Ticket();
        sampleThree.setResourceName("Computer Lab A1");
        sampleThree.setLocation("Computer Science Building, Lab A1");
        sampleThree.setCategory("Software Issue");
        sampleThree.setDescription("Multiple computers in the lab are unable to connect to the university network.");
        sampleThree.setPriority("Medium");
        sampleThree.setContactName("Alex Johnson");
        sampleThree.setContactEmail("alex.johnson@university.edu");
        sampleThree.setContactPhone("+1 555-0199");
        sampleThree.setStatus(TicketStatus.OPEN);
        sampleThree.setCreatedAt(Instant.now().minusSeconds(5400));
        sampleThree.setUpdatedAt(Instant.now().minusSeconds(5400));

        Comment sampleCommentThree = new Comment();
        sampleCommentThree.setAuthorName("IT Support");
        sampleCommentThree.setContent("Issue reported to network team. Investigating router configuration.");
        sampleCommentThree.setCreatedAt(Instant.now().minusSeconds(5200));
        sampleCommentThree.setUpdatedAt(Instant.now().minusSeconds(5200));
        sampleThree.getComments().add(sampleCommentThree);

        Ticket sampleFour = new Ticket();
        sampleFour.setResourceName("Library Study Room 5");
        sampleFour.setLocation("Main Library, Study Room 5");
        sampleFour.setCategory("Facility Request");
        sampleFour.setDescription("The air conditioning in the study room is not working, making it uncomfortably warm.");
        sampleFour.setPriority("Low");
        sampleFour.setContactName("Sarah Lee");
        sampleFour.setContactEmail("sarah.lee@university.edu");
        sampleFour.setContactPhone("+1 555-0200");
        sampleFour.setStatus(TicketStatus.RESOLVED);
        sampleFour.setAssignedTo("Maintenance Team");
        sampleFour.setResolutionNotes("AC unit repaired and tested. Room temperature now at 72°F.");
        sampleFour.setCreatedAt(Instant.now().minusSeconds(10800));
        sampleFour.setUpdatedAt(Instant.now().minusSeconds(3600));

        Comment sampleCommentFour = new Comment();
        sampleCommentFour.setAuthorName("Maintenance Team");
        sampleCommentFour.setContent("AC filter cleaned and refrigerant level checked. Issue resolved.");
        sampleCommentFour.setCreatedAt(Instant.now().minusSeconds(3700));
        sampleCommentFour.setUpdatedAt(Instant.now().minusSeconds(3700));
        sampleFour.getComments().add(sampleCommentFour);

        ticketRepository.saveAll(List.of(sampleOne, sampleTwo, sampleThree, sampleFour));
        }
    }
}
