SELECT
  `accounts`.`users`.`id` AS `id`,
  `accounts`.`users`.`first_name` AS `first_name`,
  `accounts`.`users`.`middle_name` AS `middle_name`,
  `accounts`.`users`.`last_name` AS `last_name`,
  `accounts`.`users`.`group` AS `group`,
  `accounts`.`users`.`email` AS `email`,
  `accounts`.`users`.`password` AS `password`,
  `accounts`.`users`.`role` AS `role`
FROM
  `accounts`.`users`