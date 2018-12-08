Feature: As a manager, 
         i want to store all the feedback my employees gave me, 
         so that I can consult them and rate each feedback at any time.

  Scenario: List all feedbacks
    Given a pre existing feedback list
    When i request it
    Then return a list with all feedbacks