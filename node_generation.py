import json
import random
from datetime import datetime, timedelta

# Function to generate random dates
def random_date(start, end):
    return start + timedelta(days=random.randint(0, int((end - start).days)))

# Function to generate random phone numbers
def random_phone_number():
    return f"+91-{random.randint(1000, 9999)}-{random.randint(100000, 999999)}"

# Sample data for roles, departments, and locations specific to India
roles = ["CEO", "General Manager", "Project Manager", "Team Lead", "Software Engineer", "Data Analyst", "Intern"]
departments = ["Executive", "Human Resources", "Finance", "Engineering", "Marketing", "Sales", "Customer Support"]
locations = ["Mumbai", "Bengaluru", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata"]
statuses = ["Active", "On Leave", "Retired", "Closed"]
performance_ratings = ["A", "B", "C", "D"]
skills_pool = ["Leadership", "Strategic Planning", "Communication", "Technical Expertise", "Project Management"]

# Function to generate a single node
def generate_node(id, level, parent_id):
    role = random.choice(roles)
    department = random.choice(departments)
    location = random.choice(locations)
    hire_date = random_date(datetime(2000, 1, 1), datetime(2023, 1, 1))
    status = random.choice(statuses)
    budget = random.randint(1000000, 50000000)  # Random budget value
    performance_rating = random.choice(performance_ratings) if level >= 2 else None
    skills = random.sample(skills_pool, 3)
    projects = random.sample(["Project Aryan", "Project Bhavya", "Project Chaitanya"], random.randint(1, 3))

    node = {
        "id": id,
        "name": f"Node {id}",
        "parentId": parent_id,
        "level": level,
        "roleTitle": role,
        "department": department,
        "location": location,
        "hireDate": hire_date.strftime("%Y-%m-%d"),
        "email": f"node{id}@example.com",
        "phoneNumber": random_phone_number(),
        "status": status,
        "budget": budget,
        "headCount": 0,  # Initial headcount is 0, will be updated later
        "projectAssigned": projects,
        "performanceRating": performance_rating,
        "skills": skills
    }

    return node

# Function to generate nodes and maintain the hierarchy
def generate_nodes(total_nodes_required, max_levels):
    nodes = []
    id_counter = 10000001
    total_nodes = 0
    nodes_to_process = [(None, 1)]  # (parent_id, level)

    while total_nodes < total_nodes_required and nodes_to_process:
        parent_id, level = nodes_to_process.pop(0)

        node = generate_node(id_counter, level, parent_id)
        nodes.append(node)
        total_nodes += 1
        id_counter += 1

        if total_nodes < total_nodes_required:
            num_children = random.randint(0, 10)  # Random number of children (0 to 10)
            next_level = level + 1 if level < max_levels else level
            for _ in range(num_children):
                if total_nodes + len(nodes_to_process) >= total_nodes_required:
                    break
                nodes_to_process.append((node["id"], next_level))

    # Now, link children to their parents and calculate headcount
    nodes_dict = {node["id"]: node for node in nodes}
    for node in nodes:
        if node["parentId"] is not None:
            parent_node = nodes_dict[node["parentId"]]
            if "children" not in parent_node:
                parent_node["children"] = []
            parent_node["children"].append(node)
            # Update headCount based on the number of children
            parent_node["headCount"] = len(parent_node["children"])

    # Remove empty "children" attributes
    for node in nodes:
        if "children" in node and not node["children"]:
            del node["children"]

    # Return the root nodes (those with no parent) and total_nodes count
    return [node for node in nodes if node["parentId"] is None], total_nodes

# Parameters
total_nodes_required = 17000
max_levels = 16

# Generate the nodes
root_nodes, total_nodes_generated = generate_nodes(total_nodes_required, max_levels)

# Collect metadata
metadata = {
    "specifiedTotalNodes": total_nodes_required,
    "generatedTotalNodes": total_nodes_generated,
    "roles": roles,
    "skills": skills_pool,
    "performanceRatings": performance_ratings,
    "locations": locations,
    "departments": departments,
    "statuses": statuses,
    "nodes": root_nodes
}

# Convert to JSON and save to a file
file_name = "nested_organizational_data_india.json"
json_data = json.dumps(metadata, indent=2)
with open(file_name, "w") as f:
    f.write(json_data)

